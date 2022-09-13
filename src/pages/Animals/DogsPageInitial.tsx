import styled, { css } from 'styled-components'
// components
import { Layout } from 'components'
import { BreedsTable } from 'features/dogsInitial/components'
// features

export const DogsPageInitial = () => {
  return (
    <Layout>
      <Div>
        <h3>Who wants to see some nice dogs?</h3>

        <div className="breeds-table">
          <BreedsTable />
        </div>
      </Div>
    </Layout>
  )
}

export const Div = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .breeds-table {
    ${({ theme }) => css`
      height: calc(100vh - ${theme.constants.navbarHeight} - ${theme.constants.tableHeadHeight});
    `}
  }
`
