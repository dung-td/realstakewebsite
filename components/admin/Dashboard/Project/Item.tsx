import { useState, useEffect, Fragment, MouseEvent, KeyboardEvent } from "react"
import Image from "next/image"
import Chip from "@mui/material/Chip"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import PostContent from "../../../../components/EstateDetail/PostContent"
import Avatar from "@mui/material/Avatar"
import ProjectContent from "../../../ProjectDetail/ProjectContent"

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 2,
}

const Item: React.FC<{ data: any; callback: any }> = ({ data, callback }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [expandDetail, setExpandDetail] = useState(false)
  const [previewDrawler, setPreviewDrawler] = useState(false)
  const Swal = require("sweetalert2")

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return
      }
      setPreviewDrawler(open)
    }

  return (
    <div className="mb-4 p-4 grid grid-full grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="col-span-12 md:col-span-3 lg:col-span-3">
        <Image
          alt={data.title}
          className="rounded-lg"
          src={data.images[0]}
          width={600}
          height={400}
        />
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="inline-flex items-center">
          <a href="#" className="text-xl font-bold text-gray-700">
            {data.name}
          </a>
        </div>
        <p className="text-gray-700">
          <span className="font-semibold">{data.projectType.name}</span> -{" "}
          {data.address}
        </p>

        <div className="grid grid-cols-4 gap-4 mt-6 w-full">
          <div className="col-span-2">
            <p>Trạng thái</p>
            {data.projectStatus == "finish" ? (
              <Chip label="Đã bàn giao" color="success" />
            ) : data.projectStatus == "open" ? (
              <Chip label="Đang bàn giao" color="warning" />
            ) : (
              <Chip label="Cho đặt trước" color="error" />
            )}
          </div>
          <div className="col-span-2">
            <p>Mã dự án</p>
            <p className="font-bold">{data._id}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày đăng</p>
            <p className="font-bold">{data.publishedDate}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày hết hạn</p>
            <p className="font-bold">{data.expiredDate}</p>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 mt-4">
        {/* {data.status == "waiting" ? (
          <>
            <p>Hạn duyệt bài</p>
            <p className="font-bold">20/02/2022</p>
          </>
        ) : null} */}
      </div>
      <div className="w-full col-span-12 md:col-span-6 mt-4 grid grid-cols-4 gap-1">
        <div className="col-span-4 md:col-span-1">
          <button
            type="button"
            className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={toggleDrawer(true)}
          >
            Chi tiết
          </button>
        </div>

        <div className="col-span-2 md:col-span-1">
          <button
            type="button"
            className="w-full text-white bg-green-700 hover:bg-green-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              callback(data._id, "approve")
            }}
          >
            Duyệt tin
          </button>
        </div>

        <div className="col-span-2 md:col-span-1">
          <button
            type="button"
            className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              callback(data._id, "decline")
            }}
          >
            Từ chối
          </button>
        </div>
      </div>

      <Fragment>
        <Drawer
          anchor="right"
          open={previewDrawler}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ minWidth: 500 }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="max-w-2xl relative bg-white pb-12 flex flex-col">
              <div className="inline-flex items-center justify-center px-4 py-4 fixed bg-white z-10 w-[42rem]">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={toggleDrawer(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-strokeLinecap="round"
                      stroke-strokeLinejoin="round"
                      stroke-strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="ml-auto mr-auto font-bold text-xl">
                  Thông tin xem trước
                </p>
              </div>

              <div className="px-4 pt-5 pb-2 flex">
                <ProjectContent project={data} />
              </div>
            </div>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  )
}

export default Item
