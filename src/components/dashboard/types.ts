type SignerProfile = {
  account: {
    ageDays: number;
  },
  transactions: {
    all: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction?: Date;
      lastTransaction?: Date;
      spanDays: number;
      activeDaysCount: number;
    },
    in: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction?: Date;
      lastTransaction?: Date;
      spanDays: number;
      activeDaysCount: number;
    },
    out: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction?: Date;
      lastTransaction?: Date;
      spanDays: number;
      activeDaysCount: number;
    }
  },
  tokens: {
    address: string;
    volume: string;
    volumeIn: string;
    volumeOut: string;
  }[]
  interactions: {
    address: string;
    count: number;
  }[],
  contractsDeployed: number,
}

export type ProfileLogin = {
  application_id: number;
  date: Date;
  chain_id: number;
  signer_address: string;
  count: number;
  address: string;
  profile: SignerProfile;
};
