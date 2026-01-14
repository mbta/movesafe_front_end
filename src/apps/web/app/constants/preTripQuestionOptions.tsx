import { colors, metrics } from "@repo/themes";
import { MdOutlineCancel, MdOutlineErrorOutline } from "react-icons/md";
import Image from "next/image";
import { TrainIcon } from "@repo/ui/components";

export default [
  {
    color: colors.mustard,
    icon: (
      <MdOutlineErrorOutline size={metrics.logoSize} color={colors.mustard} />
    ),
    iconColored: (
      <MdOutlineErrorOutline size={metrics.logoSize} color={colors.white} />
    ),
    isTrainIcon: false,
  },
  {
    color: colors.red,
    icon: <MdOutlineCancel size={metrics.logoSize} color={colors.red} />,
    iconColored: (
      <MdOutlineCancel size={metrics.logoSize} color={colors.white} />
    ),
    isTrainIcon: false,
  },
  {
    color: colors.softWhiteBlue,
    icon: (<TrainIcon/>),
    iconColored: (<TrainIcon/>),
    isTrainIcon: true,
  },
];
