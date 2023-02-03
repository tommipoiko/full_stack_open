const SuccessMsg = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

export default SuccessMsg