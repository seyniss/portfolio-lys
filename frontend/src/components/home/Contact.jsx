import React, { useState } from 'react'
import "./styles/Contact.scss"
import contact from '../../utils/contact'
import { api } from '../../lib/api'
const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "in progress"
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/api/contact", formData)

      if (response.status == 201) {
        alert("문의 접수 완료")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in progress"
        })
      }
    } catch (error) {
      console.log("오류발생",error)
      Swal.fire("문의 접수 오류",error)
    }
  }

  return (
    <div className='inner contact-inner'>
      <h1 className="tit">
        contact
        <span className="star-spin">
          <i className="star">✱</i>
        </span>
      </h1>
      <div className="contact-wrapper">
        <form className='contact-form'>
          <ul>
            <li>
              <label htmlFor="name" className='label'>이름</label>
              <div className="field">
                <input
                  type="text"
                  id='name'
                  name='name'
                  value={formData.name}
                  placeholder='홍길동'
                  onChange={handleChange}
                />
              </div>
            </li>
            <li>
              <label htmlFor="email" className='label'>이메일</label>
              <div className="field">
                <input type="email"
                  id='email'
                  placeholder='example@naver.com'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </li>
            <li>
              <label htmlFor="phone" className='label'>연락처</label>
              <div className="field">
                <input type="tel"
                  id='phone'
                  placeholder='010-1234-5678'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </li>
            <li>
              <label htmlFor="message" className='label'>문의 내용</label>
              <div className="field">
                <textarea name="message" id="message" rows={7}
                  value={formData.message}
                  placeholder='문의 하실 내용을 자세히 적어주세요' required
                  onChange={handleChange}></textarea>
              </div>
            </li>
            <li>
              <div className="field">
                <button type='submit' className='Button'>contact me</button>
              </div>
            </li>
          </ul>

        </form>
        <ul className="contact-lst">
          {contact.basics.map((item) => (
            <li key={item.label}>
              <strong className="label">{item.label}</strong>
              <div className="content">
                <a href={item.href}>{item.value}</a>
                <div className="hint">{item.hint}</div>
              </div>
            </li>

          ))}
          <li>
            <strong className="label">채널</strong>
            <div className="contact-chips">
              {contact.channels.map((item) => (

                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Contact