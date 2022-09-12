import { handleAxiosError } from './../utils/errors'
import { createEffect } from 'effector'
import { IBaseEffectArgs, ICreateCost, IRefreshToken } from '../types'
import { removeUser } from '../utils/auth'
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

export const getCostsFX = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    //prettier-ignore
    const { data } = await api.get(url, { headers: { "Authorization": `Bearer ${token}` } })
    return data
  } catch (error) {
    handleAxiosError(error, { type: 'get' })
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
