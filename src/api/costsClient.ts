import { handleAxiosError } from './../utils/errors'
import { createEffect } from 'effector'
import { IBaseEffectArgs, ICreateCost, IDeleteCost, IRefreshToken } from '../types'
import { removeUser } from '../utils/auth'
import api from './axiosClient'

export const createCostFX = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(
      url,
      { ...cost },
      //prettier-ignore
      { headers: { 'Authorization': `Bearer ${token}` } },
    )
    return data
  } catch (error) {
    handleAxiosError(error, { type: 'create', createCost: { cost } })
  }
})

export const getCostsFX = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    //prettier-ignore
    const { data } = await api.get(url, { headers: { 'Authorization': `Bearer ${token}` } })
    return data
  } catch (error) {
    handleAxiosError(error, { type: 'get' })
  }
})

export const deleteCostFX = createEffect(async ({ url, token, id }: IDeleteCost) => {
  try {
    //prettier-ignore
    await api.delete(`${url}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
  } catch (error) {
    handleAxiosError(error, { type: 'delete', deleteCost: { id } })
  }
})

export const refreshTokenFx = createEffect(async ({ url, token, username }: IRefreshToken) => {
  try {
    const result = await api.post(url, { refresh_token: token, username })
    if (result.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...result.data,
          username,
        }),
      )
      return result.data.access_token
    } else {
      removeUser()
    }
  } catch (error) {}
})
