import { createEffect } from 'effector'
import { ICreateCost, IGetCosts } from '../types'
import api from './axiosClient'

export const createCostFX = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(
      url,
      { ...cost },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getCostsFX = createEffect(async ({ url, token }: IGetCosts) => {
  try {
    //prettier-ignore
    const { data } = await api.get(url, { headers: { "Authorization": `Bearer ${token}` } })
    return data
  } catch (error) {
    console.log(error)
  }
})
