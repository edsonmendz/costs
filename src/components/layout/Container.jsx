import '../layout/estilo.css'

function Container(props) {
  return (
    <div className='minHeigth container'>
      {props.children}
    </div>
  )
}

export default Container