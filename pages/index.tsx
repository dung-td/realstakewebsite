import type { GetServerSideProps } from "next"
import { useState } from "react"
import Image from "next/image"
import Head from "next/head"

import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import NewsSection from "../components/News/Section"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"
import ListProjectOnHome from "../components/Estate/ListProjectOnHome"

import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import News from "../interfaces/news"

import Item from "../components/User/Transaction/Item"

type Props = {
  news: News[]
  estateOnHome: any[]
  projectOnHome: any[]
}

const Home = ({ news, estateOnHome, projectOnHome }: Props) => {
  return (
    <div className="relative">
      <Header />

      {/* Search bar */}
      <div className="grid-full">
        <div className="relative mb-8">
          <div className="home-banner">
            <Image
              height={600}
              width={1920}
              alt="banner"
              src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552538/real-estate/bannerbatdongsan07_bl4gmn.jpg"
            />
          </div>
          <div className="px-4 md:w-full ml-auto mr-auto md:absolute md:top-10">
            <SearchBar />
          </div>
        </div>

        {/* Section */}
        <div className=" space-y-16">
          <NewsSection typeSlug="tin-noi-bat" news={news} />

          <City
           />
          {/* ELEMENTS GO HERE PLEASE */}

          <ListEstateOnHome posts={estateOnHome} />
          <ListProjectOnHome posts={projectOnHome} />
        </div>
      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting provinces
  // const { provinces, smallProvinces } = await getProvince()
  // const { postCounts } = await getPostCount()
  // Getting news
  const { news } = await getNews()
  const { estateOnHome } = await getPost()
  const { projectOnHome } = await getProject()

  return {
    props: { news, estateOnHome, projectOnHome },
  }
}

const getNews = async () => {
  const res = await fetch(`${server}/news/popular?limit=1`)

  let data = await res.json()
  let news = data.data

  return { news }
}

const getPost = async () => {
  const fetchPost = await fetch(`${server}/post/get?stt=approved&limit=1`)
  let posts = await fetchPost.json()

  posts = posts.data
  let estateOnHome = new Array()

  posts.forEach((post: any) => {
    let obj = {
      _id: post._id,
      title: post.title,
      address: post.address,
      estateType: post.estateType,
      thumbnail: post.images[0],
      purpose: post.forSaleOrRent,
      price: post.price,
      priceType: post.priceType,
      area: post.area,
      bathroom: post.bathroomNumber,
      bedroom: post.bedroomNumber,
      ownerName: post.owner.name,
      ownerPhone: post.owner.phone,
      publishDate: post.publishedDate,
      titleColor: post.postType.title_color,
      slug: post.slug,
    }
    if (estateOnHome.length < 6) {
      estateOnHome.push(obj)
    }
  })

  return { estateOnHome }
}

const getProject = async () => {
  const fetchPrj = await fetch(`${server}/project/get?limit=1`)
  let posts = await fetchPrj.json()

  posts = posts.data
  let projectOnHome = new Array()

  posts.forEach((post: any) => {
    let obj = {
      _id: post._id,
      name: post.name,
      address: post.location.DistrictName + ", " + post.location.CityName,
      projectType: post.projectType,
      projectStatus: post.projectStatus,
      thumbnail: post.images[0],
      price: post.price,
      area: post.area,
      titleColor: post.postType.title_color,
      slug: post.slug,
    }
    if (projectOnHome.length < 6) {
      projectOnHome.push(obj)
    }
  })

  return { projectOnHome }
}

export default Home
