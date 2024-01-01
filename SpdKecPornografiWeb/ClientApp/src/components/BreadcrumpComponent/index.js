import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import React from "react";
import {Link} from "react-router-dom";

const BreadcrumbComponent = ({paths}) => {
    return(
        <Breadcrumb>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                return (
                    <BreadcrumbItem
                        key={index}
                        active={isLast}
                    >
                        {!isLast ? (
                            <Link to={path.link}>{path.text}</Link>
                        ) : (
                            <span>{path.text}</span>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};
export default BreadcrumbComponent;