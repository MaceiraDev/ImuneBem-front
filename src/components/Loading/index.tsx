import { Spinner } from "react-bootstrap"

interface ILoading {
  loading: boolean
}

export const Loading = (props: ILoading) => {
  return (
    props.loading ?
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: 'fixed',
          zIndex: 99,
          width: '100%',
          height: '100%',
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
      :
      <></>
  )
}