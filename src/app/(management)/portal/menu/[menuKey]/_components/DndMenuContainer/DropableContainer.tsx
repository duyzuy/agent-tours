import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
interface DropableContainerProps {
  depth: number;
  id: number;
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const DropableContainer: React.FC<DropableContainerProps> = ({ depth, id, isActive, className = "", children }) => {
  const { setNodeRef, isOver } = useDroppable({ id: id });

  console.log("drop", isOver, id);
  return (
    <div
      className={classNames(`menu-list-container`, {
        "border-dashed": isActive,
        [className]: className,
      })}
      // style={{ marginLeft: `${60}px` }}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
export default DropableContainer;
