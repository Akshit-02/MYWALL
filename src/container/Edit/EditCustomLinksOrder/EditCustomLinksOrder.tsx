import React, { useEffect, useState } from "react";
import styles from "./EditCustomLinksOrder.module.scss";
import Header from "@/components/Header/Header";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Image from "next/image";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { Button } from "antd";
import Toast from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { useSelector } from "react-redux";
import { updateCustomLinks } from "@/store/sagas/handlers/configure.handle";
import transition from "@/components/Transition/Transition";
import Link from "next/link";
import { CustomLink, EditCustomLinksProps } from "@/models/arrangeOrder";
import EmptyArrangeOrder from "@/components/EmptyArrangeOrder/EmptyArrangeOrder";

const EditCustomLinks = ({ data, subSectionId }: EditCustomLinksProps) => {
  const userDetail = useSelector((state: any) => state.auth);
  const [editData, setEditData] = useState<CustomLink[]>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setEditData(data);
  }, [data]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const handleOnDragEnd = (result: any) => {
    if (!result.destination || !editData) return;

    const items = Array.from(editData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedData = items.map((item, index) => ({
      ...item,
      position: index,
    }));
    setEditData(updatedData);
  };

  const submit = async () => {
    setLoading(true);
    try {
      if (!editData) {
        return;
      }
      await Promise.all(
        editData.map(async (item) => {
          const payload = {
            id: item.id,
            position: item.position,
          };
          await updateCustomLinks(payload);
        })
      );
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.userDetail?.id,
      });
      router.push("/configure/wall");
      showToast("Link order edited successfully!", "success");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`${styles.container} pageWidth`}>
        <Header title="Edit Links Order" />
        {!!editData?.length && (
          <div className={styles.dragItem}>
            <div className={styles.itemContainer}>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided: any) => (
                    <ul
                      className={styles.ul}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {editData?.map((item: any, index: number) => (
                        <Draggable
                          key={index}
                          draggableId={String(index)}
                          index={index}
                        >
                          {(provided: any) => (
                            <div
                              className={styles.itemWrapper}
                              key={index}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.charactersThumb}>
                                <Image
                                  src={"/assets/svg/drag.svg"}
                                  alt="drag"
                                  height={28}
                                  width={28}
                                />
                              </div>
                              <div className={styles.imageTag}>
                                <Image
                                  src={getPublicURL("public/" + item?.image)}
                                  alt="image"
                                  width={52}
                                  height={39}
                                />
                              </div>

                              <div className={styles.rightSectionWrapper}>
                                <div className={styles.titleWrapper}>
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div>
              <Button
                type="primary"
                loading={loading}
                onClick={submit}
                size={"large"}
              >
                Done
              </Button>
            </div>
          </div>
        )}
        {!!!editData?.length && (
          <EmptyArrangeOrder subSectionId={subSectionId} />
        )}
      </div>
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
    </div>
  );
};

export default transition(EditCustomLinks);
