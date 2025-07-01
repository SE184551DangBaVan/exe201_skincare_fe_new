import SkincareBG from '../../assets/skincare_bg.png'
import './BGImage.css'

export default function BGImage() {
  return (
    <>
      <div className='mask' />
      <div className='bgImg'><img src={SkincareBG} alt='' /></div>
    </>
  )
}
