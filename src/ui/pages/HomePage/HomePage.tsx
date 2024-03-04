import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Menu from "ui/components/Menu";
import Title from "ui/components/Title";
import BoxAdapter from "ui/htsc-components/BoxAdapter";
import BreadcrumbsAdapter from "ui/htsc-components/BreadcrumbsAdapter";
import SvgToIcon from "ui/htsc-components/SvgToIcon";
import activation from "../../../assets/menu/active-check.svg";
import issueCheck from "../../../assets/menu/check-issue.svg";
import checkCashing from "../../../assets/menu/check-to-cashe.svg";
import deactivation from "../../../assets/menu/deactive-check.svg";
import confirmRecivedCheck from "../../../assets/menu/recieve-check-confirm.svg";
import checkTeransfer from "../../../assets/menu/transfer-check.svg";

export default function HomePage() {
  const { t } = useTranslation();

  const menuList = useMemo(() => {
    return [
      {
        id: "1",
        title: t("activation"),
        icon: (
          <SvgToIcon
            icon={activation}
            alt="activation"
          />
        )
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
  }, []);

  const breadcrumbs = useMemo(() => {
    return [
      {
        title: t("accountServices"),
        key: "1",
        href: "/"
      },
      {
        title: t("electronicCheck"),
        key: "2",
        href: "/"
      }
    ];
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <BoxAdapter fullWidth>
        <BreadcrumbsAdapter breadcrumbs={breadcrumbs} />
        <Title>{t("chequeMenu")}</Title>
        <Menu list={menuList} />
      </BoxAdapter>
    </div>
  );
}
