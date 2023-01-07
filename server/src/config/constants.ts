export enum COLLECTIONS {
  USERS = 'users',
  GENRES = 'genres'
}

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3
}

export enum MESSAGES {
  TOKEN_VERICATION_FAILED = 'Token no valido, inicia sesion de nuevo'
}

export enum ACTIVE_VALUES_FILTER {
  ALL = 'ALL',
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

export enum SUBSCRIPTIONS_EVENT {
  UPDATE_STOCK_PRODUCT = 'UPDATE_STOCK_PRODUCT'
}
