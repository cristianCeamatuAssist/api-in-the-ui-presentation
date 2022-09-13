import { Navigate, Route, Routes } from 'react-router-dom'
// pages
import { PathsEnum } from 'pages'
import { DogsPageInitial } from './Animals/DogsPageInitial'
import { DogsPageSmarter } from './Animals/DogsPageSmarter'
import { DogsPageTerminator } from './Animals/DogsPageTerminator'

export const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={`${PathsEnum.dogs}/smarter`} element={<DogsPageSmarter />} />
      <Route path={`${PathsEnum.dogs}/terminator`} element={<DogsPageTerminator />} />
      <Route path={`${PathsEnum.dogs}/initial`} element={<DogsPageInitial />} />

      {/* Signed in routes */}
      {/* <Route element={(() => (loggedIn ? <Outlet /> : <Navigate replace to={PathsEnum.login} />))()}>
        <Route path={`${PathsEnum.route1}/*`} element={<DataHandling />} />
      </Route>*/}
      <Route path={PathsEnum.other} element={<Navigate replace to={PathsEnum.defaultRoute} />} />
    </Routes>
  )
}
