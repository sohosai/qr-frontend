import axios from 'axios'
import { ApiResult, Lending, Spot, Fixtures, SearchFixtures } from '@/types'

const get_auth_token = () => {
  return localStorage.getItem('auth-token')
}

export const register_auth_token = (v: string) => {
  localStorage.setItem('auth-token', v)
}

export type IdType = 'FixturesQrId' | 'FixturesId' | 'LendingId'

export type id = {
  id_type: IdType
  id: string
}

export type Result<T> = T | 'void' | 'auth' | 'notfound' | 'server' | 'env'

function result_handling<T>(result: ApiResult<T>): Result<T> {
  if (result.ok) {
    if (result.data) {
      return result.data
    } else {
      return 'void'
    }
  } else if (result.error_type == 'Authorized') {
    return 'auth'
  } else if (result.error_type == 'CouldNotFoundEnv') {
    return 'env'
  } else if (
    result.error_type == 'DatabaseGet' ||
    result.error_type == 'DatabaseDelete' ||
    result.error_type == 'UrlQuery' ||
    result.error_type == 'BrokenUuid' ||
    result.error_type == 'DatabaseNotFound'
  ) {
    return 'notfound'
  } else {
    return 'server'
  }
}

type REST = 'GET' | 'POST' | 'DELETE'
// 関数を生成する関数
async function gen_api_fun<T, V>(
  url_str: string,
  is_auth: boolean,
  rest: REST,
  data: T | null,
): Promise<Result<V>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}${url_str}`
    if (is_auth) {
      const auth_token = get_auth_token()
      if (auth_token) {
        const headers = {
          Authorization: `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        }
        const axios_res =
          rest == 'GET'
            ? axios.get(url, { headers: headers })
            : rest == 'POST'
            ? axios.post(url, data, { headers: headers })
            : axios.delete(url, { headers: headers })
        const res = axios_res
          .then(function (response) {
            const result: ApiResult<V> = response.data
            return result_handling(result)
          })
          .catch(function (error) {
            if (error.response) {
              const result: ApiResult<V> = error.response.data
              return result_handling(result)
            } else {
              return 'server'
            }
          })
        return res
      } else {
        return 'auth'
      }
    } else {
      const headers = { 'Content-Type': 'application/json' }
      const axios_res =
        rest == 'GET'
          ? axios.get(url, { headers: headers })
          : rest == 'POST'
          ? axios.post(url, data, { headers: headers })
          : axios.delete(url, { headers: headers })
      const res = axios_res
        .then(function (response) {
          const result: ApiResult<V> = response.data
          return result_handling(result)
        })
        .catch(function (error) {
          if (error.response) {
            const result: ApiResult<V> = error.response.data
            return result_handling(result)
          } else {
            return 'server'
          }
        })
      return res
    }
  } else {
    return 'env'
  }
}

export async function insert_fixtures(fixtures: Fixtures): Promise<Result<void>> {
  return await gen_api_fun('/insert_fixtures', true, 'POST', fixtures)
}

export async function update_fixtures(fixtures: Fixtures): Promise<Result<void>> {
  return await gen_api_fun('/update_fixtures', true, 'POST', fixtures)
}

export async function delete_fixtures(id: id): Promise<Result<void>> {
  const url =
    id.id_type == 'FixturesId' ? `/delete_fixtures?id=${id.id}` : `/delete_fixtures?qr_id=${id.id}`
  return await gen_api_fun(url, true, 'DELETE', null)
}

export async function get_fixtures(id: id): Promise<Result<Fixtures>> {
  const url =
    id.id_type == 'FixturesId' ? `/get_fixtures?id=${id.id}` : `/get_fixtures?qr_id=${id.id}`
  return await gen_api_fun(url, false, 'GET', null)
}

export async function search_fixtures(text: string): Promise<Result<SearchFixtures[]>> {
  const url = `/search_fixtures?keywords=${text}`
  return await gen_api_fun(url, false, 'GET', null)
}

export async function insert_lending(lending: Lending): Promise<Result<void>> {
  return await gen_api_fun('/insert_lending', true, 'POST', lending)
}

export async function returned_lending(id: id): Promise<Result<void>> {
  const url =
    id.id_type == 'FixturesId'
      ? `/returned_lending?fixtures_id=${id.id}`
      : id.id_type == 'FixturesQrId'
      ? `/returned_lending?fixtures_qr_id=${id.id}`
      : `/returned_lending?lending_id=${id.id}`
  return await gen_api_fun(url, true, 'POST', null)
}

export async function get_lending_list(): Promise<Result<Lending[]>> {
  return await gen_api_fun('/get_lending_list', false, 'GET', null)
}

export async function get_lending(id: id): Promise<Result<Lending>> {
  const url =
    id.id_type == 'FixturesId'
      ? `/get_lending?fixtures_id=${id.id}`
      : id.id_type == 'FixturesQrId'
      ? `/get_lending?fixtures_qr_id=${id.id}`
      : `/get_lending?lending_id=${id.id}`
  return await gen_api_fun(url, false, 'GET', null)
}

export async function get_is_lending(id: id): Promise<Result<boolean>> {
  const url =
    id.id_type == 'FixturesId'
      ? `/get_is_lending?fixtures_id=${id.id}`
      : id.id_type == 'FixturesQrId'
      ? `/get_is_lending?fixtures_qr_id=${id.id}`
      : `/get_is_lending?lending_id=${id.id}`
  return await gen_api_fun(url, false, 'GET', null)
}

export async function insert_spot(spot: Spot): Promise<Result<void>> {
  return await gen_api_fun('/insert_spot', true, 'POST', spot)
}

export async function update_spot(spot: Spot): Promise<Result<void>> {
  return await gen_api_fun('/update_spot', true, 'POST', spot)
}

export async function get_spot(name: string): Promise<Result<Spot>> {
  return await gen_api_fun(`/get_spot?name=${name}`, false, 'GET', null)
}

export async function get_spot_list(): Promise<Result<Spot[]>> {
  return await gen_api_fun(`/get_spot_list`, false, 'GET', null)
}

export async function delete_spot(name: string): Promise<Result<void>> {
  return await gen_api_fun(`/delete_spot?name=${name}`, true, 'DELETE', null)
}

export async function gen_passtoken(pass: string): Promise<Result<string>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}/gen_passtoken`
    const res = axios
      // とりあえず管理者権限で発行
      // 今後は切り替えるようにしたりしたい
      .post(url, null, { auth: { username: 'administrator', password: pass } })
      .then(function (response) {
        const result: ApiResult<string> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<string> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else {
    return 'env'
  }
}
