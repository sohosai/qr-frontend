import * as React from 'react'
import { render } from '@testing-library/react'
import QRCode from '.'

describe('QRCodeを描画する', () => {
    const uuid = "abdda618-0cd7-6ba7-f806-058506bfd373"
    it('QRを描画する', () => {
        render(<QRCode uuid={uuid} />)
    })
})
