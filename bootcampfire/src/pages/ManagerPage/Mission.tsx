import { StrongBtn } from "components/Board/styled";
import ManageTable from "components/Manager/ManageTable";
import { MissionCreateModal } from "components/Manager/MissionCreateModal";
import MissionTable from "components/Manager/MissionTable";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Mission() {
  const [isMissionCreateModalOpen, setMissionCreateModalOpen] =
    React.useState(false);
  const isManageCreateHandle = () => {
    setMissionCreateModalOpen(true);
  };

  // 모달을 닫기 위한 이벤트 핸들러를 만듭니다.
  const handleCloseModal = () => {
    setMissionCreateModalOpen(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MissionTable></MissionTable>
      <StrongBtn type="first" onClick={isManageCreateHandle}>
        미션등록
      </StrongBtn>
      <MissionCreateModal
        isMissionCreateModalOpen={isMissionCreateModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
