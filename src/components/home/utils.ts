import { SignerProfile } from '../dashboard/types'

function getActivityLevel(count: number): string {
  if (count === 0) return 'Inactive'
  if (count < 5) return 'Casual'
  if (count < 20) return 'Active'
  if (count < 50) return 'Very active'
  return 'Power user'
}

function getFrequencyLevel(frequency: number): string {
  if (frequency === 0) return 'Never'
  if (frequency < 0.1) return 'Rarely'
  if (frequency < 0.5) return 'Occasionally'
  if (frequency < 1) return 'Regularly'
  if (frequency < 3) return 'Frequently'
  return 'Very frequently'
}

function getAccountAgeLabel(ageDays: number): string {
  if (ageDays < 7) return 'New account'
  if (ageDays < 30) return 'Recent account'
  if (ageDays < 180) return 'Established account'
  if (ageDays < 365) return 'Mature account'
  return 'Veteran account'
}

function getTransactionPatternLabel(profile: SignerProfile): string[] {
  const labels: string[] = []
  const { all, in: incoming, out: outgoing } = profile.transactions

  // Overall activity
  labels.push(getActivityLevel(all.countAll))
  labels.push(getFrequencyLevel(all.frequencyAll))

  // Recent activity
  if (all.count7d > 0) {
    labels.push('Recently active')
  }
  if (all.count30d > all.count7d * 3) {
    labels.push('Increasing activity')
  }

  // Transaction patterns
  if (incoming.countAll > outgoing.countAll * 2) {
    labels.push('Receiver')
  } else if (outgoing.countAll > incoming.countAll * 2) {
    labels.push('Sender')
  } else {
    labels.push('Balanced')
  }

  // Consistency
  const activityRatio = all.activeDaysCount / all.spanDays
  if (activityRatio > 0.8) {
    labels.push('Consistent')
  } else if (activityRatio < 0.2) {
    labels.push('Sporadic')
  }

  return labels
}

function getTokenLabels(profile: SignerProfile): string[] {
  const labels: string[] = []
  
  if (profile.tokens.length === 0) {
    return ['No tokens']
  }

  // Token usage patterns
  if (profile.tokens.length > 5) {
    labels.push('Multi-token user')
  }

  // Volume patterns
  const hasHighVolume = profile.tokens.some(token => 
    parseFloat(token.volume) > 100
  )
  if (hasHighVolume) {
    labels.push('High volume trader')
  }

  // Direction patterns
  const isReceiver = profile.tokens.some(token => 
    parseFloat(token.volumeIn) > parseFloat(token.volumeOut) * 2
  )
  const isSender = profile.tokens.some(token => 
    parseFloat(token.volumeOut) > parseFloat(token.volumeIn) * 2
  )
  if (isReceiver) labels.push('Token receiver')
  if (isSender) labels.push('Token sender')

  return labels
}

function getContractLabels(profile: SignerProfile): string[] {
  const labels: string[] = []

  // Contract deployment
  if (profile.contractsDeployed > 0) {
    labels.push('Contract deployer')
    if (profile.contractsDeployed > 3) {
      labels.push('Prolific deployer')
    }
  }

  // Contract interactions
  if (profile.interactions.length > 0) {
    labels.push('Contract user')
    if (profile.interactions.length > 5) {
      labels.push('Active contract user')
    }
  }

  return labels
}

export function generateProfileLabels(profile: SignerProfile): string[] {
  const labels: string[] = []

  labels.push(getAccountAgeLabel(profile.account.ageDays))
  labels.push(...getTransactionPatternLabel(profile))
  labels.push(...getTokenLabels(profile))
  labels.push(...getContractLabels(profile))

  return [...new Set(labels)]
}
