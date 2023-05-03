import styled from "styled-components";
import { MdAddBusiness } from "react-icons/md";
import { MdList } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5dc;
  width: 100%;
  height: 100vh;
  padding: 24px;
  overflow: auto;
`;

export const Title = styled.h1`
  margin-bottom: 100px;
`;

export const CardsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const CompanyIcon = styled(MdAddBusiness)`
  font-size: 24px;
`;

export const SupplierIcon = styled(TbTruckDelivery)`
  font-size: 24px;
`;

export const ListIcon = styled(MdList)`
  font-size: 24px;
`;
