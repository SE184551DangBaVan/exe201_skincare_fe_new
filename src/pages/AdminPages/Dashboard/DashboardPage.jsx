import BGImage from "../../../components/BGImage/BGImage"
import "./DashboardPage.css"
import Header from "../../../components/Header/Header"
import Tracker from "../../../components/Charts/Tracker"

import skincareIcon2 from "../../../assets/product_icon_2.png";
import skincareIcon3 from "../../../assets/product_icon_3.png";

import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import SalesTracker from "../../../components/Charts/SalesTracker"
import { AccountBox, AssignmentInd, BarChart, ListAlt, LocalMall, MonetizationOn, PermContactCalendar, PersonOutline } from "@mui/icons-material"
import CompositionExample from "../../../components/Charts/GaugePointer"
import { LineChart } from "@mui/x-charts"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ExcelAccess from "../../../components/Charts/ExcelAccess";

export default function DashboardPage() {
  const { scrollYProgress } = useScroll();
  const [dailyRegister, setDailyRegister] = useState(0);
  const [weeklyRegister, setWeeklyRegister] = useState(0);
  const [monthlyRegister, setMonthlyRegister] = useState(0);
  
  const [dailyLogin, setDailyLogin] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [total, setTotatl] = useState("");
  const [logs, setLogs] = useState([]);

  const [revenuePeriod, setRevenuePeriod] = useState("monthly");
  const [revenuePeriodLabel, setRevenuePeriodLabel] = useState("tháng");


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const revenueMap = {
    "Hàng ngày": {
      api: "daily",
      label: "ngày"
    },
    "Hàng tuần": {
      api: "weekly",
      label: "tuần"
    },
    "Hàng tháng": {
      api: "monthly",
      label: "tháng"
    }
  };

  useMotionValueEvent(scrollYProgress, "change",);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  useEffect(() => {
    const fetchProfitMargin = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/revenue/monthly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.total === "number") {
          setProfitMargin(response.data.total);
        }
      } catch (error) {
        console.error("Failed to fetch Profit", error);
      }
    };

    fetchProfitMargin();
    const interval = setInterval(fetchProfitMargin, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`https://skincareapp.somee.com/SkinCare/Admin/revenue/${revenuePeriod}`, {
          withCredentials: true,
        });
        setLogs(res.data.logs || []);
        setTotatl(res.data.total || 0);
      } catch (err) {
        console.error("Failed to fetch revenue logs", err);
      }
    };

    fetchLogs();
  }, [revenuePeriod]);

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
      [0.9, 2],
      ["0%", "10%"]
  )
  const size4 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.8"]
  )
  const blurFilter4 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.5"]
  )
  const position5 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["0%", "10%"]
  )
  const size5 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["1", "0.8"]
  )
  const blurFilter5 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.5"]
  )
  return (
    <div className='dashBoardPage'>
        <BGImage />
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
                    <SalesTracker icon={<BarChart />} number={profitMargin} title="Tổng doanh thu" profit="Lợi nhuận tháng này" available={true} currency={true}/>
                    <SalesTracker icon={<ListAlt />} number={weeklyRegister} title="Đăng ký hàng tuần" profit={`${dailyLogin} đăng nhập trong 24h qua`} available={true} />
                    <SalesTracker icon={<LocalMall />} number="00" title="Sản phẩm đã bán" profit="Currently No Data" available={false} />
                    <SalesTracker icon={<PersonOutline />} number={monthlyRegister} title="Người dùng mới" profit="+30% so với tháng trước" available={true} />
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
          <div className="revenue-title">
            <div className="revenue-title-header">Doanh thu hàng {revenuePeriodLabel}</div>
            <div className="revenue-total-profit">{total}</div>
          </div>
          <div
            className={`swanky_wrapper ${isDropdownOpen ? 'open' : ''}`}
            ref={dropdownRef}
          >
            <div className="swanky_header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src="..." alt="" />
              <span>Giai đoạn</span>
              <div className="lil_arrow" />
              <div className="bar" />
            </div>

            {isDropdownOpen && (
              <div className="swanky_wrapper__content">
                <ul>
                  {["Hàng ngày", "Hàng tuần", "Hàng tháng"].map((item, idx) => (
                    <li key={idx} onClick={() => {
                      setIsDropdownOpen(false);
                      const { api, label } = revenueMap[item];
                      setRevenuePeriod(api);
                      setRevenuePeriodLabel(label);
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="revenue-slider revenue-auto-slider" style={{
            "--width": "300px",
            "--height": "200px",
            "--quantity": logs.length
          }}>
            {logs.length === 0 ? (
              <div className="no-revenue-data">Không có dữ liệu cho giai đoạn này.</div>
            ) : (
              <div className="list">
                {logs.map((log, i) => (
                  <div className="item" key={i} style={{ "--position": i + 1 }}>
                    <div className="revenue-card">
                      <div className="revenue-card-header">{log.userEmail}</div>
                      <div className="revenue-card-body">
                        <h5 className="revenue-card-title">{log.packageName}</h5>
                        <h3 className="revenue-card-profit">
                          {new Intl.NumberFormat('vi-VN').format(log.paymentAmount)}
                        </h3>
                        <p className="revenue-card-text">{log.paymentStatus}</p>
                        <p className="revenue-card-date">
                          {new Date(log.paymentDate).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div  className="dashBoardContainer"
            style={{y: position5, scale: size5, opacity: blurFilter5}}>
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
