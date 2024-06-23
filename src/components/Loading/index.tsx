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
                <div
                    className="spinner-border"
                    role="status"
                    style={{
                        width: '3rem',
                        height: '3rem',
                    }}
                >
                </div>
            </div>
            :
            <></>
    )
}