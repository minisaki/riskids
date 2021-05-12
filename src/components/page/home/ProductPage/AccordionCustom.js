import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionActions from '@material-ui/core/AccordionActions';  

// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";

import styles from "./accordionStyle.js";

const useStyles = makeStyles(styles);

export default function AccordionCustom(props) {
  const [active, setActive] = React.useState(
    props.active.length === undefined ? [props.active] : props.active
  );
  const [single] = React.useState(
    props.active.length === undefined ? true : false
  );
  const handleChange = (panel) => () => {
    let newArray;

    if (single) {
      if (active[0] === panel) {
        newArray = [];
      } else {
        newArray = [panel];
      }
    } else {
      if (active.indexOf(panel) === -1) {
        newArray = [...active, panel];
      } else {
        newArray = [...active];
        newArray.splice(active.indexOf(panel), 1);
      }
    }
    setActive(newArray);
  };
  const { collapses, activeColor } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        return (
          // <ExpansionPanel
          <Accordion
            expanded={active === key || active.indexOf(key) !== -1}
            onChange={handleChange(key)}
            key={key}
            classes={{
              root: classes.expansionPanel,
              expanded: classes.expansionPanelExpanded,
            }}
          >
            {/* <ExpansionPanelSummary */}
            <AccordionSummary
              expandIcon={<ExpandMore />}
              classes={{
                root: `${classes.expansionPanelSummary} ${
                  classes[activeColor + "ExpansionPanelSummary"]
                }`,
                expanded: `${classes.expansionPanelSummaryExpaned} ${
                  classes[activeColor + "ExpansionPanelSummaryExpaned"]
                }`,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon,
              }}
            >
              <h4 className={classes.title}>{prop.title}</h4>
            {/* </ExpansionPanelSummary> */}
            </AccordionSummary>
            {/* <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {prop.content}
            </ExpansionPanelDetails> */}
            <AccordionDetails className={classes.expansionPanelDetails}>
            {prop.content}
            </AccordionDetails>
          {/* </ExpansionPanel> */}
          </Accordion>
        );
      })}
    </div>
  );
}

AccordionCustom.defaultProps = {
  active: -1,
  activeColor: "primary",
};

AccordionCustom.propTypes = {
  // index of the default active collapse
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node,
    })
  ).isRequired,
  activeColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
  ]),
};
