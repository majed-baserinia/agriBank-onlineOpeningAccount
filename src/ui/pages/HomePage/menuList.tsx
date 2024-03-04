import { t } from "i18next";
import SvgToIcon from "ui/htsc-components/SvgToIcon";
import activation from "../../../assets/menu/active-check.svg";
import issueCheck from "../../../assets/menu/check-issue.svg";
import checkCashing from "../../../assets/menu/check-to-cashe.svg";
import deactivation from "../../../assets/menu/deactive-check.svg";
import confirmRecivedCheck from "../../../assets/menu/recieve-check-confirm.svg";
import checkTeransfer from "../../../assets/menu/transfer-check.svg";

export const menuList = [
  {
    id: "1",
    title: t("activation"),
    icon: (
      <SvgToIcon
        icon={activation}
        alt="activation"
      />
    ),
    routeTo: "/cheque/activation/firststep"
  },
  {
    id: "2",
    title: t("deactivation"),
    icon: (
      <SvgToIcon
        icon={deactivation}
        alt="deactivation"
      />
    )
  },
  {
    title: t("issueCheck"),
    icon: (
      <SvgToIcon
        icon={issueCheck}
        alt="issueCheck"
      />
    )
  },
  {
    title: t("confirmRecivedCheck"),
    icon: (
      <SvgToIcon
        icon={confirmRecivedCheck}
        alt="confirmRecivedCheck"
      />
    )
  },
  {
    title: t("checkTeransfer"),
    icon: (
      <SvgToIcon
        icon={checkTeransfer}
        alt="checkTeransfer"
      />
    )
  },
  {
    title: t("checkCashing"),
    icon: (
      <SvgToIcon
        icon={checkCashing}
        alt="checkCashing"
      />
    )
  }
];
