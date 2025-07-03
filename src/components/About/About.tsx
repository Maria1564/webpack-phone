import React from 'react'
import s from "./About.module.scss"
type Props = {}

const About = (props: Props) => {
  console.log(s)
  return (
    <div className={s.about__text}>About</div>
  )
}

export default About