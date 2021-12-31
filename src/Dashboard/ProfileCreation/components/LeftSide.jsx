import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import SelectProfileTemplate from "./SelectProfileTemplate";
import SetupProfileLink from './SetupProfileLink';
import SetUpPersonalInformation from './SetUpPersonalInformation';
import SetupSocialLink from './SetupSocialLink';

function LeftSide() {
  const [open, setOpen] = useState([]);
  const handelOpen = (data) => {
    if (open.includes(data)) {
     const newList = open.filter(el => el !== data)
     setOpen(newList)
    } else {
      setOpen([...open,data]);
    }
  };

  console.log(open)
  return (
    <div className="left-side-container ">
      <SelectProfileTemplate handelOpen={handelOpen} open={open} title={"Select Your Profile Template"} />
      <SetupProfileLink handelOpen={handelOpen} open={open} title={"Setup Profile Link"}/>
      <SetUpPersonalInformation  handelOpen={handelOpen} open={open} title={"Setup Personal Information"}/>
      <SetupSocialLink  handelOpen={handelOpen} open={open} title={"Setup Social Link"}/>

    </div>
  );
}

export default LeftSide;
