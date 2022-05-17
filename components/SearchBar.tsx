import { NextPage, GetServerSideProps } from "next"
import React, { useState, Component, useEffect } from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Autocomplete from "@mui/material/Autocomplete"
import { Province } from "../interfaces/Province"
import TextField from "@mui/material/TextField"
import server from "../interfaces/server"

type Props = {
  provinces: Province[]
}

type EstateType = {
  _id: string
  name: string
  slug: string
}

type Search = {
  province?: string
  district?: string
  ward?: string
  street?: string
  price?: string
  area?: string
  type?: string
  bedroom?: string
  width?: string
  streetWidth?: string
  orientation?: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const SearchBar = ({ provinces }: Props) => {
  const [SearchExpand, setSearchExpand] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [estateType, setEstateType] = useState("sell")

  const [price, setPrice] = useState("")
  const [area, setArea] = useState("")

  useEffect(() => {
    fetch(`${server}/a/estate-type/get`)
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.data)
      })
  }, [])

  const [search, setSearch] = useState<Search>({
    province: "",
    district: "",
    ward: "",
    street: "",
    price: "",
    area: "",
    type: "",
    bedroom: "",
    width: "",
    streetWidth: "",
    orientation: "",
  })

  const [districts, setDistrics] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())
  const [types, setTypes] = useState([])

  const prices = [
    { value: "mat-tien", label: "Thỏa thuận" },
    { value: "mat-tien2", label: "< 500 triệu" },
    { value: "mat-tien3", label: "500 - 800 triệu" },
    { value: "mat-tien4", label: "800 triệu - 1 tỷ" },
    { value: "mat-tien5", label: "1 triệu - 3 tỷ" },
    { value: "mat-tien6", label: "3 triệu - 7 tỷ" },
    { value: "mat-tien7", label: "7 triệu - 10 tỷ" },
    { value: "mat-tien8", label: "> 10 tỷ" },
  ]

  const areas = [
    { value: "mat-tien", label: "< 30 m²" },
    { value: "mat-tien2", label: "30m² - 100 m²" },
    { value: "mat-tien3", label: "100m² - 200m²" },
    { value: "mat-tien4", label: "200m² - 500m²" },
    { value: "mat-tien5", label: "> 500m²" },
  ]

  const projects = [
    { value: "project-1", label: "Vinhomes 1" },
    { value: "project-2", label: "Vinhomes 2" },
    { value: "project-3", label: "Vinhomes 3" },
    { value: "project-4", label: "Vinhomes 4" },
    { value: "project-5", label: "Vinhomes 5" },
  ]

  const projectStatus = [
    { value: "project-1", label: "Tất cả" },
    { value: "project-2", label: "Sắp mở bán" },
    { value: "project-3", label: "Đang mở bán" },
    { value: "project-4", label: "Đã bàn giao" },
  ]

  const bedroom = [
    { value: "project-1", label: "1 - 2" },
    { value: "project-2", label: "3 - 5" },
    { value: "project-3", label: "> 5" },
  ]

  const width = [
    { value: "4mt", label: " <= 4m" },
    { value: "6mt", label: "4m - 10m" },
    { value: "10mt", label: "10m - 20m" },
    { value: "12mt", label: "20m - 50m" },
    { value: "12mt", label: "> 50m" },
  ]

  const streetWidth = [
    { value: "4mt", label: "4m" },
    { value: "6mt", label: "6m" },
    { value: "10mt", label: "10m" },
    { value: "12mt", label: "12m" },
  ]

  const orientation = [
    { value: "4mt", label: "Đống" },
    { value: "6mt", label: "Đông Bắc" },
    { value: "10mt", label: "Bắc" },
    { value: "12mt", label: "Tấy Bắc" },
    { value: "12mt", label: "Tấy" },
    { value: "12mt", label: "Tấy Nam" },
    { value: "12mt", label: "Nam" },
    { value: "12mt", label: "Đông Nam" },
  ]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    switch (newValue) {
      case 0:
        setEstateType("hire")
        break
      case 1:
        setEstateType("sell")
        break
      case 2:
        setEstateType("project")
        break
      default:
        setEstateType("hire")
        break
    }
  }

  const onSearch = () => {
    console.log(search)
  }

  const onTypeChange = (event: SelectChangeEvent) => {
    let type = event.target.value.toString()
    if (search != undefined && type != undefined) {
      setSearch({
        ...search,
        type: type,
      })
    }
  }

  const onAreaChange = (event: SelectChangeEvent) => {
    let area = event.target.value.toString()
    if (search != undefined && area != undefined) {
      setSearch({
        ...search,
        area: area,
      })
    }
  }

  const onPriceChange = (event: SelectChangeEvent) => {
    let price = event.target.value.toString()
    if (search != undefined && price != undefined) {
      setSearch({
        ...search,
        price: price,
      })
    }
  }

  const onProvinceChange = (event: SelectChangeEvent) => {
    let provinceId = event.target.value.toString()
    console.log(provinceId)
    if (search != undefined && provinceId != undefined) {
      search.province = provinceId
    }
    fetchDistrict(provinceId)
  }

  const onDistrictChange = (event: SelectChangeEvent) => {
    let districtId = event.target.value.toString()
    if (search != undefined && districtId != undefined) {
      search.district = districtId
    }
    fetchWard(districtId)
    fetchStreet(districtId)
  }

  const onWardChange = (event: SelectChangeEvent) => {
    let wardId = event.target.value.toString()
    if (search != undefined) {
      setSearch({
        ...search,
        ward: wardId,
      })
    }
  }

  const onStreetChange = (event: SelectChangeEvent) => {
    let streetId = event.target.value.toString()
    if (search != undefined) {
      setSearch({
        ...search,
        street: streetId,
      })
    }
  }

  const fetchDistrict = async (provinceId: string | undefined) => {
    if (provinceId !== undefined) {
      fetch(`${server}/a/district/get?p=${provinceId}`)
        .then((res) => res.json())
        .then((data) => {
          let ds = new Array()
          data.data.forEach((district: any) => {
            let d = {
              label: district.districtName,
              value: district.districtCode,
            }
            ds.push(d)
          })
          setDistrics(ds)
        })
    }
  }

  const fetchWard = async (districtId: string | undefined) => {
    if (districtId !== undefined) {
      fetch(`${server}/a/ward/get?d=${districtId}`)
        .then((res) => res.json())
        .then((data) => {
          let ws = new Array()
          data.data.forEach((ward: any) => {
            let w = {
              label: ward.wardName,
              value: ward.wardCode,
            }
            ws.push(w)
          })
          setWards(ws)
        })
    }
  }

  const fetchStreet = async (districtId: string | undefined) => {
    if (districtId !== undefined) {
      fetch(`${server}/a/street/get?d=${districtId}`)
        .then((res) => res.json())
        .then((data) => {
          let ss = new Array()
          data.data.forEach((street: any) => {
            let s = {
              label: street.streetName,
              value: street.streetCode,
            }
            ss.push(s)
          })
          setStreets(ss)
        })
    }
  }

  const expandSearch = () => {
    setSearchExpand(!SearchExpand)
  }

  return (
    <div className="grid bg-white rounded-md drop-shadow-xl">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Nhà cho thuê" />
            <Tab label="Nhà bán/ sang nhượng" />
            <Tab label="Dự án" />
          </Tabs>
        </Box>

        <div
          className="md:p-6"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mt-2 mb-1 md:mb-0 md:mt-0 lg:col-span-2">
              <FormControl fullWidth>
                <InputLabel id="label-input-type">Loại nhà đất</InputLabel>
                <Select
                  labelId="label-input-type"
                  id="input-type"
                  value={search.type}
                  label="Loại nhà đất"
                  onChange={onTypeChange}
                >
                  {types.map((type: EstateType) => {
                    return (
                      <MenuItem key={type._id} value={type._id}>
                        {type.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="relative col-span-12 sm:col-span-9 lg:col-span-8 ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-icons">search</span>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-full w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bạn tìm kiếm gì hôm nay?"
              />
            </div>
            <div className="col-span-12 lg:col-span-2 sm:col-span-12">
              <button
                type="button"
                className="text-white h-full w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  onSearch()
                }}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4 sm:p-8">
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="label-input-city">Tỉnh/ thành phố</InputLabel>
                <Select
                  labelId="label-input-city"
                  id="input-city"
                  value={search.province}
                  label="Tỉnh/ thành phố"
                  onChange={onProvinceChange}
                >
                  {provinces.map((province) => {
                    return (
                      <MenuItem key={province.value} value={province.value}>
                        {province.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="label-input-price">Khoảng giá</InputLabel>
                <Select
                  labelId="label-input-price"
                  id="input-price"
                  value={search.price}
                  label="Khoảng giá"
                  onChange={onPriceChange}
                >
                  {prices.map((price) => {
                    return (
                      <MenuItem key={price.value} value={price.value}>
                        {price.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            {estateType != "project" ? (
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-area">Diện tích</InputLabel>
                  <Select
                    labelId="label-input-area"
                    id="input-area"
                    value={search.area}
                    label="Diện tích"
                    onChange={onAreaChange}
                  >
                    {areas.map((area) => {
                      return (
                        <MenuItem key={area.value} value={area.value}>
                          {area.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            ) : (
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-area">Tình trạng</InputLabel>
                  <Select
                    labelId="label-input-area"
                    id="input-area"
                    value={search.area}
                    label="Diện tích"
                    onChange={onAreaChange}
                  >
                    {projectStatus.map((status) => {
                      return (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            )}

            {estateType != "project" ? (
              <div className="inline-flex justify-center items-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <button
                  id="dropdownTypeSearch"
                  className="justify-center text-blue-700 text-base font-medium w-full inline-flex items-center bg-white focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-5 py-2.5"
                  type="button"
                  onClick={expandSearch}
                >
                  <p>Mở rộng tìm kiếm</p>
                  <span className="material-icons">arrow_drop_down</span>
                </button>
              </div>
            ) : null}
          </div>

          {SearchExpand ? (
            <div className=" grid grid-cols-12 gap-4 mt-4 sm:p-8">
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quận/ huyện/ thành phố
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search.district}
                    label="Quận/ huyện/ thành phố"
                    onChange={onDistrictChange}
                  >
                    {districts.map((district) => {
                      return (
                        <MenuItem key={district.value} value={district.value}>
                          {district.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div
                key={"ward"}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">
                    Phường/ xã/ thị trấn
                  </InputLabel>
                  <Select
                    labelId="label-input-ward"
                    id="input-ward"
                    value={search.ward}
                    label="Phường/ xã/ thị trấn"
                    onChange={onWardChange}
                  >
                    {wards.map((ward) => {
                      return (
                        <MenuItem key={ward.value} value={ward.value}>
                          {ward.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Đường/ phố</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.street}
                    label="Đường/ phố"
                    onChange={onStreetChange}
                  >
                    {streets.map((street) => {
                      return (
                        <MenuItem key={street.value} value={street.value}>
                          {street.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Dự án</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.street}
                    label="Đường/ phố"
                    onChange={onStreetChange}
                  >
                    {streets.map((street) => {
                      return (
                        <MenuItem key={street.value} value={street.value}>
                          {street.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Số phòng ngủ</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.bedroom}
                    label="Số phòng ngủ"
                    onChange={(event: SelectChangeEvent) => {
                      if (search != undefined) {
                        setSearch({
                          ...search,
                          bedroom: event.target.value.toString(),
                        })
                      }
                    }}
                  >
                    {bedroom.map((num) => {
                      return (
                        <MenuItem key={num.value} value={num.value}>
                          {num.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Hướng nhà</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.orientation}
                    label="Hướng nhà"
                    onChange={(event: SelectChangeEvent) => {
                      if (search != undefined) {
                        setSearch({
                          ...search,
                          orientation: event.target.value.toString(),
                        })
                      }
                    }}
                  >
                    {orientation.map((orientation) => {
                      return (
                        <MenuItem
                          key={orientation.value}
                          value={orientation.value}
                        >
                          {orientation.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Đường rộng</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.streetWidth}
                    label="Đường rộng"
                    onChange={(event: SelectChangeEvent) => {
                      if (search != undefined) {
                        setSearch({
                          ...search,
                          streetWidth: event.target.value.toString(),
                        })
                      }
                    }}
                  >
                    {streetWidth.map((width) => {
                      return (
                        <MenuItem key={width.value} value={width.value}>
                          {width.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <FormControl fullWidth>
                  <InputLabel id="label-input-ward">Mặt tiền</InputLabel>
                  <Select
                    labelId="label-input-street"
                    id="input-ward"
                    value={search.width}
                    label="Mặt tiền"
                    onChange={(event: SelectChangeEvent) => {
                      if (search != undefined) {
                        setSearch({
                          ...search,
                          width: event.target.value.toString(),
                        })
                      }
                    }}
                  >
                    {width.map((width) => {
                      return (
                        <MenuItem key={width.value} value={width.value}>
                          {width.label}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          ) : null}
        </div>
      </Box>
    </div>
  )
}

export default SearchBar
