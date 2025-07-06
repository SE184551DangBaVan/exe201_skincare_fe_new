import BGImage from '../../components/BGImage/BGImage'
import ContactUs from '../../components/ContactUs/ContactUs'
import './AboutPage.css'

import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='aboutUs'>
      <BGImage />
      <div className='aboutUscontent'>
        <div className='aboutUscontent-left'>
          <h1>Về nền tảng chăm sóc da của chúng tôi</h1>
          <div>
            Giới thiệu
            <span> Chào mừng bạn đến với SkinSense – điểm đến hàng đầu cho các giải pháp chăm sóc da cá nhân hóa.
              Nền tảng của chúng tôi giúp người dùng nâng cao hiểu biết, nhận tư vấn chuyên sâu từ AI, và kết nối với cộng đồng yêu thích làm đẹp để chia sẻ trải nghiệm thật và đánh giá sản phẩm thực tế.
            </span>
          </div>
          <div>
            Sứ mệnh của chúng tôi
            <span> Chúng tôi hướng tới việc đổi mới ngành chăm sóc da bằng cách xây dựng một không gian đáng tin cậy, nơi bạn có thể tìm thấy sản phẩm phù hợp nhất với làn da của mình – dựa trên công nghệ AI hiện đại và đánh giá thực từ người dùng.</span>
          </div>
          <div>
            Chúng tôi mang đến cho bạn
            <span>
              <ul>
                <li>Tư vấn chăm sóc da bằng AI: Gợi ý cá nhân hóa dựa trên vấn đề da của bạn.</li>
                <li>Góc nhìn từ cộng đồng: Đọc và chia sẻ đánh giá thật, mẹo hay và trải nghiệm thực tế.</li>
                <li>Sản phẩm được kiểm chứng: Khám phá các sản phẩm được tuyển chọn kỹ càng phù hợp với từng nhu cầu.</li>
                <li>Kiến thức hữu ích: Tìm hiểu về thành phần, quy trình chăm sóc da và xu hướng ngành làm đẹp.</li>
              </ul>
            </span>
          </div>
          <div>
            Vì sao chọn chúng tôi?
            <span>
              <ul>
                <li>Gợi ý dựa trên khoa học: AI phân tích tình trạng da để đưa ra sản phẩm phù hợp nhất.</li>
                <li>Cộng đồng thật sự: Người dùng thật – phản hồi thật – trải nghiệm thật.</li>
                <li>Ưu tiên bền vững: Ưu tiên sản phẩm thân thiện với môi trường và không thử nghiệm trên động vật.</li>
              </ul>
              Hãy đồng hành cùng chúng tôi trong hành trình tái định nghĩa chăm sóc da bằng công nghệ, minh bạch và sức mạnh cộng đồng. Khám phá – Kết nối – Làm chủ làn da của bạn cùng Team202.
            </span>
          </div>
        </div>
        <div className='aboutUscontent-right'>
          <ContactUs />
        </div>
      </div>
    </div>
  )
}
