import { Navigate } from 'react-router-dom'

function AdministratorRedirect() {
  return (
    <Navigate
      replace
      to="dev"
    />
  )
}

export default AdministratorRedirect
