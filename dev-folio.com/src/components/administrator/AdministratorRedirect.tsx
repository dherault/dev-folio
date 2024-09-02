import { Navigate } from 'react-router-dom'

function AdministratorRedirect() {
  return (
    <Navigate
      replace
      to="/administrator/skills"
    />
  )
}

export default AdministratorRedirect
