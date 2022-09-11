import { ICost } from './../types/index'
import { createDomain } from 'effector'
const costs = createDomain()

export const setCosts = costs.createEvent<ICost[]>()
export const createCost = costs.createEvent<ICost>()
export const updateCost = costs.createEvent<ICost>()
export const removeCost = costs.createEvent<string | number>()

export const setTotalPrice = costs.createEvent<number>()

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCost, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)

export const $totalPrice = costs.createStore<number>(0).on(setTotalPrice, (_, value) => value)
