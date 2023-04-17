import React from 'react'
import { BlocksEditor } from '.'
import failOnConsole from 'jest-fail-on-console'
import { configure, shallow } from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'

configure({ adapter: new Adapter() })
failOnConsole()

describe('BlocksEditor', () => {
  it('renders without errors', async () => {
    return new Promise((resolve) => {
      const wrapper = shallow(
        <BlocksEditor>
          {() => {
            resolve(true)
          }}
        </BlocksEditor>
      )

      const iframe = wrapper.find('iframe')
      expect(iframe).toBeTruthy()

      iframe.simulate('load')
    })
  })
})
