import { StrongBtn } from "components/Board/styled";
import ManageTable from "components/Manager/ManageTable";
import { useNavigate } from "react-router-dom";

export default function Managements() {
  const navigate = useNavigate();
  const openManageCreate = () => {
    navigate("create");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ManageTable></ManageTable>
      <StrongBtn type="first" onClick={openManageCreate}>
        부트 캠프 등록
      </StrongBtn>
    </div>
  );
}
