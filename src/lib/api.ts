import axios from 'axios'
import { ApiResult, Lending, Spot, Fixtures, SearchFixtures } from '@/types'

const get_auth_token = () => {
  return localStorage.getItem('auth-token')
}

const register_auth_token = (v: string) => {
  localStorage.setItem('auth-token', v)
}

export type IdType = 'FixturesQrId' | 'FixturesId' | 'LendingId'

export type id = {
  id_type: IdType
  id: string
}

export type Result<T> = T | 'auth' | 'notfound' | 'server' | 'env'

function result_handling<T>(result: ApiResult<T>): Result<T> {
  if (result.ok && result.data) {
    return result.data
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

export async function insert_fixtures(fixtures: Fixtures): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/insert_fixtures`
    const res = axios
      .post(url, fixtures, {
        headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function update_fixtures(fixtures: Fixtures): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/update_fixtures`
    const res = axios
      .post(url, fixtures, {
        headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function delete_fixtures(id: id): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url =
      id.id_type == 'FixturesId'
        ? `${api_url}/delete_fixtures?id=${id.id}`
        : `${api_url}/delete_fixtures?qr_id${id.id}`
    const res = axios
      .post(url, { headers: { Authorization: `Bearer ${auth_token}` } })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function get_fixtures(id: id): Promise<Result<Fixtures>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url =
      id.id_type == 'FixturesId'
        ? `${api_url}/delete_fixtures?id=${id.id}`
        : `${api_url}/delete_fixtures?qr_id${id.id}`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<Fixtures> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<Fixtures> = error.response.data
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

export async function search_fixtures(text: string): Promise<Result<SearchFixtures[]>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}/search_fixtures?keywords=${text}`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<SearchFixtures[]> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<SearchFixtures[]> = error.response.data
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

export async function insert_lending(lending: Lending): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/insert_lending`
    const res = axios
      .post(url, lending, {
        headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function returned_lending(id: id): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url =
      id.id_type == 'FixturesId'
        ? `${api_url}/returned_lending?fixtures_id=${id.id}`
        : id.id_type == 'FixturesQrId'
        ? `${api_url}/returned_lending?fixtures_qr_id${id.id}`
        : `${api_url}/returned_lending?lending_id${id.id}`
    const res = axios
      .post(url, { headers: { Authorization: `Bearer ${auth_token}` } })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function get_lending_list(): Promise<Result<Lending[]>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}/get_lending_list`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<Lending[]> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<Lending[]> = error.response.data
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

export async function get_lending(id: id): Promise<Result<Lending>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url =
      id.id_type == 'FixturesId'
        ? `${api_url}/get_lending?fixtures_id=${id.id}`
        : id.id_type == 'FixturesQrId'
        ? `${api_url}/get_lending?fixtures_qr_id${id.id}`
        : `${api_url}/get_lending?lending_id${id.id}`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<Lending> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<Lending> = error.response.data
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

export async function get_is_lending(id: id): Promise<Result<boolean>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url =
      id.id_type == 'FixturesId'
        ? `${api_url}/get_is_lending?fixtures_id=${id.id}`
        : id.id_type == 'FixturesQrId'
        ? `${api_url}/get_is_lending?fixtures_qr_id${id.id}`
        : `${api_url}/get_is_lending?lending_id${id.id}`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<boolean> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<boolean> = error.response.data
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

export async function insert_spot(spot: Spot): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/insert_spot`
    const res = axios
      .post(url, spot, {
        headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function update_spot(spot: Spot): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/update_spot`
    const res = axios
      .post(url, spot, {
        headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function get_spot(name: string): Promise<Result<Spot>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}/get_spot?name=${name}`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<Spot> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<Spot> = error.response.data
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

export async function get_spot_list(): Promise<Result<Spot[]>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  if (api_url) {
    const url = `${api_url}/get_spot_list`
    const res = axios
      .get(url)
      .then(function (response) {
        const result: ApiResult<Spot[]> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<Spot[]> = error.response.data
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

export async function delete_spot(name: string): Promise<Result<void>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/delete_spot?name=${name}`
    const res = axios
      .post(url, { headers: { Authorization: `Bearer ${auth_token}` } })
      .then(function (response) {
        const result: ApiResult<void> = response.data
        return result_handling(result)
      })
      .catch(function (error) {
        if (error.response) {
          const result: ApiResult<void> = error.response.data
          return result_handling(result)
        } else {
          return 'server'
        }
      })
    return res
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}

export async function gen_passtoken(pass: string): Promise<Result<string>> {
  const api_url = process.env.NEXT_PUBLIC_QR_API_URL
  const auth_token = get_auth_token()
  if (api_url && auth_token) {
    const url = `${api_url}/gen_passtoken`
    const res = axios
      // とりあえず管理者権限で発行
      // 今後は切り替えるようにしたりしたい
      .post(url, { headers: { auth: { username: 'administrator', password: pass } } })
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
  } else if (auth_token) {
    return 'auth'
  } else {
    return 'env'
  }
}
