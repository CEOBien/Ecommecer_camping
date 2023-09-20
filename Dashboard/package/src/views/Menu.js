import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Button, Col } from "reactstrap";
const Menu = () => {
  return (
    <div className="menu">
      <div className="add-menu mb-2">
        <Button className="btn" color="success">add</Button>
      </div>
      <div className="menu-table">
        <div className="box-menu-table">
          <Row>
            <Col lg="12">
              <ProjectTables />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Menu;
