import BGImage from "../../../components/BGImage/BGImage"
import "./DashboardPage.css"
import Header from "../../../components/Header/Header"
import Tracker from "../../../components/Charts/Tracker"

import skincareIcon from "../../../assets/product_icon.png";
import skincareIcon2 from "../../../assets/product_icon_2.png";
import skincareIcon3 from "../../../assets/product_icon_3.png";

import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import SalesTracker from "../../../components/Charts/SalesTracker"
import { AccountBox, AssignmentInd, BarChart, ListAlt, LocalMall, MonetizationOn, PermContactCalendar, PersonOutline } from "@mui/icons-material"
import CompositionExample from "../../../components/Charts/GaugePointer"
import { LineChart } from "@mui/x-charts"
import axios from "axios";
import { useEffect, useState } from "react";
import ExcelAccess from "../../../components/Charts/ExcelAccess";

export default function DashboardPage() {
  const { scrollYProgress } = useScroll();
  const [dailyRegister, setDailyRegister] = useState(0);
  const [weeklyRegister, setWeeklyRegister] = useState(0);
  const [monthlyRegister, setMonthlyRegister] = useState(0);
  
  const [dailyLogin, setDailyLogin] = useState(0);

  useMotionValueEvent(scrollYProgress, "change",
  );

  useEffect(() => {
    const fetchDailyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-daily", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setDailyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch daily register count", error);
      }
    };

    fetchDailyRegister();
    const interval = setInterval(fetchDailyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeeklyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-weekly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setWeeklyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch weekly register count", error);
      }
    };

    fetchWeeklyRegister();
    const interval = setInterval(fetchWeeklyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMonthlyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-monthly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setMonthlyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch monthly register count", error);
      }
    };

    fetchMonthlyRegister();
    const interval = setInterval(fetchMonthlyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDailyLogin = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/count-login-daily", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setDailyLogin(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch monthly register count", error);
      }
    };

    fetchDailyLogin();
    const interval = setInterval(fetchDailyLogin, 10000);
    return () => clearInterval(interval);
  }, []);

  const position1 = useTransform(
      scrollYProgress,
      [0, 0.5],
      ["0%", "10%"]
  )
  const size1 = useTransform(
      scrollYProgress,
      [0, 0.5],
      ["1", "0.8"]
  )
  const blurFilter1 = useTransform(
      scrollYProgress,
      [0, 1.5],
      ["1", "0.5"]
  )
  const position2 = useTransform(
      scrollYProgress,
      [0.5, 1],
      ["0%", "10%"]
  )
  const size2 = useTransform(
      scrollYProgress,
      [0.5, 1],
      ["1", "0.8"]
  )
  const blurFilter2 = useTransform(
      scrollYProgress,
      [0.5, 1.5],
      ["1", "0.5"]
  )
  const position3 = useTransform(
      scrollYProgress,
      [0.9, 1],
      ["0%", "0%"]
  )
  const size3 = useTransform(
      scrollYProgress,
      [0.9, 1],
      ["1", "1"]
  )
  const blurFilter3 = useTransform(
      scrollYProgress,
      [0.9, 1.5],
      ["1", "1"]
  )

  const position4 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["0%", "10%"]
  )
  const size4 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["1", "0.8"]
  )
  const blurFilter4 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.5"]
  )
  return (
    <div className='dashBoardPage'>
        <BGImage />
        <img src={skincareIcon} alt="" className="misc"/>
        <img src={skincareIcon2} alt="" className="misc2"/>
        <img src={skincareIcon3} alt="" className="misc3"/>
        <motion.div  className="dashBoardContainer"
              style={{y: position1, scale: size1, opacity: blurFilter1}}>
          <Header title="Trang quản trị" subtitle="Chào mừng bạn đến với bảng điều khiển" />
          
          <div className="counterContainer" >
            <Tracker icon={<AccountBox />} title="Đăng ký hàng ngày" number={dailyRegister} />
            <Tracker icon={<AssignmentInd />} title="Đăng ký hàng tuần" number={weeklyRegister} />
            <Tracker icon={<PermContactCalendar />} title="Đăng ký hàng tháng" number={monthlyRegister} />
          </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
            style={{y: position2, scale: size2, opacity: blurFilter2}}>

            <div className="statistaContainer">
                <div className="statTitle">Doanh số hôm nay</div>
                <span className="statSubTitle">Tổng quan doanh số</span>
                
                <div className="trackerContainer" >
                    <SalesTracker icon={<BarChart />} number="00" title="Total Sales" profit="currently unavailable" />
                    <SalesTracker icon={<ListAlt />} number={dailyLogin} title="Active User" profit={`${dailyLogin} Logins in the last 24h`} />
                    <SalesTracker icon={<LocalMall />} number="00" title="Product Sold" profit="currently unavailable" />
                    <SalesTracker icon={<PersonOutline />} number={monthlyRegister} title="New Customer" profit="+20% since last month" />
                </div>
            </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
              style={{y: position3, scale: size3, opacity: blurFilter3}}>
          <Header title="Excel Spreadsheets" subtitle="Tải excel để xem" />
          
          <div className="spreadsheetsContainer" >
            <ExcelAccess icon={<AccountBox />} title="Excel về người dùng" link="https://skincareapp.somee.com/SkinCare/Admin/users/excel" fname="users.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng ngày" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/daily/excel" fname="revenue-daily.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng tuần" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/weekly/excel" fname="revenue-weekly.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng tháng" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/monthly/excel" fname="revenue-monthly.xlsx" />
          </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
            style={{y: position4, scale: size4, opacity: blurFilter4}}>

            <div className="chartContainer">
                <div className="chartTitle">Thu nhập</div>
                <span className="chartSubTitle">Tổng chi phí</span>
                
                <div className="progressGaugeContainer" >
                    <CompositionExample />
                    <div className='valuePercentage'>47%</div>
                </div>
            </div>

            <div className="lineChartContainer">
                <div className="chartTitle">Mức độ sử dụng AI</div>
                
                <div className="lineChartBox" >
                    <LineChart className="lineChart"
                        
                        series={[
                            { curve: "linear", data: [1, 5, 2, 6, 3, 9.3] },
                            { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                        ]}
                    />
                </div>
            </div>
        </motion.div >

    </div>
  )
}
