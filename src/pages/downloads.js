import React from "react"
import Layout from "../components/Layout"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import { GatsbyImage } from "gatsby-plugin-image"
import Select from 'react-select';

import CustomerProfileImage from "../images/profiles/fran-walton.png"

const whitepapers = [
  {label: 'Research Insight 2022', value: '2cc4343bff7a0aca8be90830dabf34c5'},
  {label: 'The State of Qual Research 2021', value: 'e8cafb14edf010cac418acef54d4bef7'}]

export default function Downloads() {
  return (
    <Layout>
      <Section cNames="bg-green text-tomato min-h-screen">
        <NavigationBar logoColour="pink" helloButton helloBg="pink" helloText="tomato" />
        <div className="flex flex-col justify-center items-center py-12 space-y-8">
          <h1 className="text-5xl text-center">Premium insight straight to your inbox</h1>
          <div className="py-4 px-4 bg-pink/25 rounded-lg text-pink">
            <p className="text-xl font-light">"Tom's insight has been a breakthrough for our marketing team"</p>
            <div className="flex justify-center items-center w-6/6 py-2">
              <div className="h-20 w-20">
                <img className="object-cover h-full rounded-full" src={CustomerProfileImage} alt="Profile picture of a happy customer" />
              </div>
              <div className="flex items-center text-center pt-4">
                <div className="flex flex-col pl-4 font-semibold">
                  <p className="text-lg">John Smith</p>
                  <p className="text-lg">CEO, Apple</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl font-light">Select any of our premium whitepapers below and we'll email them to you for <i>free</i>.</p>
          <div className="flex flex-col space-y-2 items-center max-w-xl">
            <Select
              isMulti
              name="resource-select"
              options={whitepapers}
              className="w-full max-w-96"
              placeholder="Select your free whitepaper(s)..."
            />
            <input className={`w-full py-2 px-2 text-white bg-white/25 border border-blue rounded`} type="text" placeholder="e.g tom@feelingmutual.com" />
            <button className="w-32 py-2 px-6 text-white bg-pink hover:bg-pink/50 font-medium leading-normal rounded transition duration-200">Download</button>
          </div>
        </div>
      </Section>
    </Layout>
  )
}