import React, { Component }  from 'react';
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";




class PopoverTip extends Component {

    constructor(props) {
        super(props);
    }

  handleRequestClose = () => {
    this.props.togglePopover();
  };

  render() {
    const { isOpen, anchorEl } = this.props;
    return (
      < div>
        {isOpen && < Popover
          open={isOpen}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        //   animation={PopoverAnimationVertical}
          onRequestClose={this.handleRequestClose}>
          < Menu>
            < MenuItem primaryText="Refresh" />
            < MenuItem primaryText="Help &amp; feedback" />
            < MenuItem primaryText="Settings" />
            < MenuItem primaryText="Sign out" />
          </ Menu>
        </ Popover>}
      </ div>
    );
  }
}

export default PopoverTip;
