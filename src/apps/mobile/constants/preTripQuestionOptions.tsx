import { colors, metrics } from "@repo/themes";
import { MdOutlineCancel, MdOutlineErrorOutline } from "react-icons/md";
import Image from "next/image";
import { TrainIcon } from "@repo/ui/components";

enum OptionValues {
  noDefect,
  minorDefect,
  majorDefect,
}

export default [
  {
    color: colors.softWhiteBlue,
    icon: (<TrainIcon/>),
    iconColored: (<TrainIcon/>),
    value: OptionValues.noDefect,
  },
  {
    color: colors.mustard,
    icon: (
      <MdOutlineErrorOutline size={metrics.iconBig} color={colors.mustard} />
    ),
    iconColored: (
      <MdOutlineErrorOutline size={metrics.iconBig} color={colors.white} />
    ),
    value: OptionValues.minorDefect,
  },
  {
    color: colors.red,
    icon: <MdOutlineCancel size={metrics.iconBig} color={colors.red} />,
    iconColored: (
      <MdOutlineCancel size={metrics.iconBig} color={colors.white} />
    ),
    value: OptionValues.majorDefect,
  },
];
