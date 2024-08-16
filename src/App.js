import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import LogInScreen from "./screen/LogInScreen/LogInScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./screen/Error/Error";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import logoutChannel from "./Apis/Auth";
import Cookies from "js-cookie";
import { useIdleTimer } from "react-idle-timer";
import { Token } from "./Hooks/LogInHooks";
import DashBoard from "./screen/DashboardScreen/Dashboard";
import handleLogout from "./Apis/LogOut";
import ReporteeStructure from "./Forms/HR/Reportee Structure/ReporteeStructure";
import WorkOrderPrinting from "./Reports/PlanningControl/WorkOrderPrinting";
import MRSPrinting from "./Reports/Purchase/MRSPrinting";
import EpEmployeeForm from "./Forms/HR/EpEmployeeForm/EpEmployeeForm";
import PuOuBdGateRep from "./Reports/Purchase/PuOuBdGateRep";
import HrCalanderGroups from "./Forms/HR/CalenderGroup/HrCalanderGroups";
import MRSSummaryRep from "./Reports/Purchase/MRSSummaryRep";
import FgShopPlanTrn from "./Forms/PlanningControl/FgShowPlanTrmFD/FgShopPlanTrn";
import PuKardexLedgerPrint from "./Reports/Purchase/PuKardexLedgerPrint";
import GateReport from "./Reports/Purchase/GateReport";
import ProjectListingRep from "./Reports/Projects/ProjectListingRep";
import StockStatusReport from "./Reports/Purchase/StockStatusReport";
import QaSafetyMon from "./Forms/QA/QaDashBoard/QaSafetyMon";
import PurchaseOrderPrinting from "./Reports/Purchase/PurchaseOrderPrinting";
import GateEntry from "./Forms/Purchase/GateEntry";
import QaEnvInfo from "./Forms/QA/QaDashBoard/QaEnvInfo";
import QaWaterTest from "./Forms/QA/QaDashBoard/QaWaterTest";
import QaSafetyForm from "./Forms/QA/QaDashBoard/QaSafetyForm";
import FgShopPlanRep from "./Reports/PlanningControl/FgShopPlanRep";
import WipWoRmLevel from "./Reports/Costing/WipWoRmLevel";
import ItemWiseControlChartRep from "./Reports/Purchase/ItemWiseControlChartRep";
import PurchaseVouPostInterPlt from "./Forms/Finance/PurchaseVouPostInterPlt";
import QaSafetyRep from "./Reports/QA/QaSafetyRep";
import InhouseTrans from "./Forms/Purchase/InhouseTrans";
import FgWorkOrderMst from "./Forms/PlanningControl/FgWorkOrderMst";
import CartonWiseLabelFGMTChecklist from "./Reports/ProductionDispatch/CartonWiseLabelFGMTChecklist";
import RateAnnexPrintingReport from "./Reports/Projects/RateAnnexPrintingReport";
import NewOrderWiseWoStatus from "./Reports/Projects/NewOrderWiseWoStatus";
import BsrProdDespBalance from "./Reports/Projects/BsrProdDespBalance";
import MaterialRequisitionSlip from "./Forms/Purchase/MaterialRequisitionSlip";
import DepatchSummaryDtWise from "./Reports/ProductionDispatch/DepatchSummaryDtWise";
import GateOutBoundTransation from "./Forms/Purchase/GateOutBoundTransation";
import ProjectWiseWoStatus from "./Reports/Projects/ProjectWiseWoStatus";
import PreMRSSlipBomRemark from "./Forms/PlanningControl/PreMRSSlipBomRemark";
import PurchaseOrder from "./Forms/Purchase/PurchaseOrder";
import FgSingleCrtnSingleItem from "./Forms/ProductionAndDispatch/FgSingleCartonSingleItemTrn";
import ProjectMasterReport from "./Reports/Projects/ProjectMasterReport";
import MockUpDespatchRep from "./Reports/Projects/MockUpDespatchRep";
import ProjectStatusRep from "./Reports/Projects/ProjectStatusRep";
// import VenderWiseRmDispatchRep from './Reports/Projects/DNDPendingStatusRep';
import QaRelDataRep from "./Reports/QA/QaRelDataRep";
import SaleRegItemWiseRep from "./Reports/Finance/SalesRegItemWise";
import ProjectMasterStatusReport from "./Reports/Purchase/ProjectMasterStatusReport";
import DNDPendingStatusRep from "./Reports/Projects/DNDPendingStatusRep";
import ColorMasterReport from "./Reports/Projects/ColorMasterReport";
import ProjectStatusExecuter from "./Reports/Projects/ProjectStatusExecuter";
import CategoryColorMasterDtlRep from "./Reports/Projects/CategoryColorMasterDtlRep";
import ListofProjectsExecuted from "./Reports/Projects/ListofProjectsExecuted";
import ProjPendDrawReport from "./Reports/Projects/ProjPendDrawReport";
import ProjWiseRevAnalysisRep from "./Reports/Projects/ProjWiseRevAnalysisRep";
import InsCustCompRep from "./Reports/Projects/InsCustCompRep";
import ListOfProjectDespatch from "./Reports/Projects/ListOfProjectDespatch";
import PPtsReport from "./Reports/Projects/PPtsReport";
import CustomerOrderListing from "./Reports/Projects/CustomerOrderListing";
import CatagaryMasterReport from "./Reports/Projects/CatagaryMasterReport";
import PrjPrdAndDispStatusRep from "./Reports/Projects/PrjPrdAndDispStatusRep";
import ProductCategaryMaster from "./Reports/Projects/ProductCategaryMaster";
import ProjectGpAnalysisRep from "./Reports/Projects/ProjectGpAnalysisRep";
import CustWiseOrdStatusRep from "./Reports/Projects/CustWiseOrdStatusRep";
import ProjWiseExpBookRep from "./Reports/Projects/ProjWiseExpBookRep";
import SubWorkordShopRep from "./Reports/PlanningControl/SubWorkShopReport";
import IndentPrinting from "./Reports/Purchase/IndentPrinting";
import SchedulePrinting from "./Reports/Purchase/SchedulePrinting";
import StockAgeingRep from "./Reports/Purchase/StockAgeingRep";
import InventoryAnalysisRep from "./Reports/Purchase/InventoryAnalysisRep";
import IndentRegisterRep from "./Reports/Purchase/IndentRegisterRep";
import LocWisVenLst from "./Reports/Purchase/LocWisVenLst";
import NewWorkOrder from "./Forms/PlanningControl/WorkOrderWiseGroup/NewWorkOrder";
import InsCustomerComplaint from "./Forms/Projects/InsCustomerComplaint/InsCustCompln";
import CustomerCategoryMaster from "./Forms/Projects/CustomerCatergoryMaster/CustomerCatergoryMaster";
import PrDeptMst from "./Forms/Projects/PrDeptMst/PrDeptMst";
import PrPrdMstApprvl from "./Forms/Projects/PrPrdMstApprval/PrPrdMstApprvl";

import WorkorderInputReport from "./Reports/PlanningControl/WorkorderInputReport/WorkorderInputReport";
// const NewWorkOrder = lazy(() => import('./Forms/PlanningControl/WorkOrderWiseGroup/NewWorkOrder'));

import "./assets/assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/assets/vendor/quill/quill.snow.css";
import "./assets/assets/vendor/quill/quill.bubble.css";
import "./assets/assets/vendor/remixicon/remixicon.css";
import "./assets/assets/vendor/simple-datatables/style.css";
import ProjectSpecificStkDtlRep from "./Reports/PlanningControl/ProjectSpecificStockDetails";

function App() {
  const [login, setLogIn] = useState(false);
  const idleLogoutRef = useRef(null);
  const { token } = Token();

  useEffect(() => {
    const closeTabsChannel = new BroadcastChannel("closeTabsChannel");

    closeTabsChannel.addEventListener("message", (event) => {
      if (event.data === "close") {
        toast.info("Other tabs are being closed.");
      }
    });

    return () => {
      closeTabsChannel.close();
    };
  }, []);

  useEffect(() => {
    const handleLogoutBroadcast = () => {
      handleLogout();
    };

    logoutChannel.addEventListener("message", handleLogoutBroadcast);

    return () => {
      logoutChannel.removeEventListener("message", handleLogoutBroadcast);
    };
  }, []);

  const logoutOnInactive = () => {
    if (login) {
      window.localStorage.clear();
      window.localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("userInfo", {
        path: "https://spacewoodofficesolutions.co.in:4000/",
      });
      Cookies.remove("connect.sid", {
        path: "https://spacewoodofficesolutions.co.in:4000/",
      });
      window.location.href = window.location.origin + "/";
      Cookies.clear();
      logoutChannel.postMessage("logout");
      handleLogout();
    }
  };

  useIdleTimer({
    timeout: 30 * 60 * 1000,
    crossTab: true,
    ref: idleLogoutRef,
    onIdle: logoutOnInactive,
  });

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const routes = {
    "/ui/PlanningAndControl/FgWorkOrderGrps/6260": NewWorkOrder,
    "/ui/PlanningAndControl/FgShopPlanTrnNew/6262": FgShopPlanTrn,
    "/ui/Hr/HrOrganisationLeft/6101": EpEmployeeForm,
    "/ui/Hr/HrReporteeStructure/8000": ReporteeStructure,
    "/ui/Hr/HrCalanderGroups/6164": HrCalanderGroups,
    "/ui/Qa/QaSafetyMon/6263": QaSafetyMon,
    "/ui/Qa/QaSafetyForm/6264": QaSafetyForm,
    "/ui/Qa/QaWaterTest/6265": QaWaterTest,
    "/ui/Qa/QaEnvInfo/6266": QaEnvInfo,
    "/ui/Finance/PurchaseVouPostInterPlt/6268": PurchaseVouPostInterPlt,
    "/ui/Purchase/PuGateEntry/7001": GateEntry,
    "/ui/Purchase/PuInhTrans/108": InhouseTrans,
    "/ui/Purchase/PuInhTransMRS/101": MaterialRequisitionSlip,
    "/ui/Purchase/GateOutboundTrns/6259": GateOutBoundTransation,
    "/ui/Purchase/PuPoHdr/89": PurchaseOrder,
    "/ui/PlanningAndControl/PreMrsSlipBomRmk/6204": PreMRSSlipBomRemark,
    "/ui/PlanningAndControl/FgWorkorderMst/219": FgWorkOrderMst,
    "/ui/ProductionAndDispatch/FgSingleCartonSingleItem/2001":
      FgSingleCrtnSingleItem,
    "/ui/Projects/InsCustomerComplaintMst/6103": InsCustomerComplaint,
    "/ui/Projects/PrDeptMst/334": PrDeptMst,
    "/ui/Projects/PrPrdMstApproval/6207": PrPrdMstApprvl,

    //rishabh 8/7/2024
    "/ui/Projects/PrPrdcustcatgMst/248": CustomerCategoryMaster,

    "/reports/Purchase/MrsPrintingRep/278": MRSPrinting,
    "/reports/Purchase/PuOuBdGateRep/6231": PuOuBdGateRep,
    "/reports/Purchase/MRSSummaryRep/605": MRSSummaryRep,
    "/reports/Purchase/PuKardexLedgerPrint/214": PuKardexLedgerPrint,
    "/reports/Purchase/PuGateEntryRep/60307": GateReport,
    "/reports/Purchase/PuStockStatusReport/295": StockStatusReport,
    "/reports/Purchase/PuPoPrint/95": PurchaseOrderPrinting,
    "/reports/Purchase/ItemwiseControlChartRep/560": ItemWiseControlChartRep,
    "/reports/Purchase/PuIndPrint/96": IndentPrinting,
    "/reports/Purchase/PuScheduleDisplay/771": SchedulePrinting,
    "/reports/ProductionAndDispatch/StockAgeingRep/590": StockAgeingRep,
    "/reports/Purchase/InventoryAnalysisRep/1017": InventoryAnalysisRep,
    "/reports/Purchase/IndentRegisterRep/365": IndentRegisterRep,
    "/reports/Purchase/LocationWiseVendorListing/319": LocWisVenLst,

    "/reports/PlanningAndControl/FgShopPlanRepSOS/6034": FgShopPlanRep,
    "/reports/PlanningAndControl/WorkOrderPrintingRep/228": WorkOrderPrinting,

    "/reports/Costing/WipWoRmLevel/6267": WipWoRmLevel,

    "/reports/Qa/QaSafetyRep/6269": QaSafetyRep,

    "/reports/ProductionAndDispatch/CrtnWiseLblFgmtChkLst/336":
      CartonWiseLabelFGMTChecklist,
    "/reports/ProductionAndDispatch/DispachSummaryRep/289":
      DepatchSummaryDtWise,

    "/reports/Projects/RateAnnexPrintRep/522": RateAnnexPrintingReport,
    "/reports/Projects/ApprovedOrderStatus/6010": NewOrderWiseWoStatus,
    "/reports/Projects/BsrProductionBalanceDtWise/6023": BsrProdDespBalance,
    "/reports/Projects/ProjectListingRep/270": ProjectListingRep,
    "/reports/Projects/PrjctWiseStatusRep/299": ProjectWiseWoStatus,
    "/reports/Projects/PrPrdMstRep/330": ProjectMasterReport,
    "/reports/Projects/MockUpDespatchRep/6270": MockUpDespatchRep,
    "/reports/Projects/ProjectStatus/1016": ProjectStatusRep,
    "/reports/Projects/ProjectMasterStatus/60310": ProjectMasterStatusReport,
    "/reports/Projects/ColMstRep/323": ColorMasterReport,
    "/reports/Projects/ProjectStatusExecuter/6065": ProjectStatusExecuter,
    "/reports/Projects/CatClrMstRep/329": CategoryColorMasterDtlRep,
    "/reports/Projects/ListofProjectExecuted/343": ListofProjectsExecuted,
    "/reports/Projects/ProjPendDrawReport/6012": ProjPendDrawReport,
    "/reports/Projects/ProjWiseRevAnalysisRep/500": ProjWiseRevAnalysisRep,
    "/reports/Projects/InsCustomerComplaintRep/6112": InsCustCompRep,
    "/reports/Projects/DespatchCompletionRep/6039": ListOfProjectDespatch,
    "/reports/Projects/ListofProjectExecuted/344": PPtsReport,
    "/reports/Projects/OrderListingReport/275": CustomerOrderListing,
    "/reports/Projects/ProcessCategoryMasterRep/324": CatagaryMasterReport,
    "/reports/Projects/PrjPrdAndDispStatusRep/5006": PrjPrdAndDispStatusRep,
    "/reports/Projects/ProdCatMstRep/327": ProductCategaryMaster,
    "/reports/Projects/CustWiseOrdStatusRep/403": CustWiseOrdStatusRep,
    "/reports/Projects/ProjWiseExpBookingReport/5534": ProjWiseExpBookRep,
    "/reports/Projects/GpAnalysis/2005": ProjectGpAnalysisRep,

    "/reports/DND/DNDRepDtl/6035": DNDPendingStatusRep,
    "/reports/Finance/SalesRegItemWise/6271": SaleRegItemWiseRep,
    "/reports/Qa/QaRelDataRep/6272": QaRelDataRep,
    "/reports/PlanningAndControl/SubWorkShopReport/6273": SubWorkordShopRep,
    "/reports/PlanningAndControl/ProjectSpecificStockDetails/6274":
      ProjectSpecificStkDtlRep,
    //rishabh
    "/reports/PlanningAndControl/WorkorderInputReport/6211":
      WorkorderInputReport,
  };

  const memoizedRoutes = useMemo(
    () =>
      Object.keys(routes).map((route, i) => {
        const Component = routes[route];
        return <Route key={i} exact path={route} element={<Component />} />;
      }),
    []
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {!token && token === null ? (
              <>
                <Route
                  path="/"
                  index
                  element={<LogInScreen setLogIn={setLogIn} />}
                />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<DashBoard />} />
                {memoizedRoutes}
                <Route
                  path="/"
                  index
                  element={<LogInScreen setLogIn={setLogIn} />}
                />
                <Route path="*" element={<Error />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}

export default App;

// select max(case when right_id is null then 0 else 1 end)new,  td.adrm_right_id,max(trunc(td.adrm_accesson))last_used, count(*)new_hits,m.adrm_type,m.adrm_name
// ,case WHEN adrm_new_window = 'Y' THEN 'Y' else 'N' end NEW_FORM_GENERATED,
// case WHEN adrm_type = 'M' THEN '3' WHEN adrm_type = 'T' THEN '3' WHEN adrm_type = 'R' THEN '1' end NEW_FORM_GENERATED
// from ad_user_recentmenus_trn td,
//      (select adrm_org_id org_id, adrm_right_id right_id from ad_user_recentmenus_trn tn where adrm_new_erp in ('Y','R') group by adrm_org_id , adrm_right_id )tn,
//      ad_right_org_mst org,ad_right_mst m
// where td.adrm_org_id=1 and trunc(td.adrm_accesson) BETWEEN '1-Jan-2023' AND '31-Dec-2023'
//       and td.adrm_right_id =right_id(+) and td.adrm_org_id=org_id(+)
//       and td.adrm_right_id = org.adrom_right_id  and td.adrm_org_id = org.adrom_org_id
//       and td.adrm_right_id = m.adrm_right_id
//      and NVL(org.adrom_defunct,'N') = 'N'
//      and m.adrm_type='R'
//      and m.adrm_module_id='4' and m.adrm_right_id not in('522', '6010', '6023', '270', '299', '330', '6270','1016','0310',
// '323','6065','329','343','6012','500','6112','6039','344','275','324','5006','327','6035','60310')
//      AND adrm_new_window = 'N' and m.adrm_module_id not in (15,16,8,2)
// --      and td.adrm_new_erp in ('Y','R')
// group by td.adrm_right_id,adrm_type,adrm_name,adrm_new_window;
