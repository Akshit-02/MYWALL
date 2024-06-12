"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Section } from "@/models";
import styles from "./Customise.module.scss";
import {
  getSections,
  sortSection,
} from "@/store/sagas/handlers/configure.handle";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import Header from "../../../components/Header/Header";

const Customise = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: any) => state.auth);
  const [updateScetions, setUpdateScetions] = useState(
    (userDetail?.sections as Array<Section> | undefined) || []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUpdateScetions(userDetail?.sections as Array<Section>);
  }, [userDetail?.sections]);

  const handleToggle = (index: number) => {
    const updatedSection = [...updateScetions];
    updatedSection[index] = {
      ...updatedSection[index],
      isArchived: !updatedSection[index].isArchived,
    };

    setUpdateScetions(updatedSection);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(updateScetions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((element: any, index: number) => {
      return {
        ...element,
        position: index + 1,
      };
    });

    setUpdateScetions(updatedItems);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sortedSections = updateScetions.map((element) => ({
        id: element.id,
        isArchived: element.isArchived,
      }));

      const payload = {
        sectionIds: sortedSections,
      };
      await sortSection(payload);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.id,
      });
      getSections(userDetail?.id);
    } catch (error) {
    } finally {
      setLoading(false);
      router.push("/configure/wall");
    }
  };

  return (
    <>
      <div className={`${styles.addNewComponents} pageWidth`}>
        <Header title="Customise" />

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided: any) => (
              <ul
                className={styles.characters}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <span className={styles.labelText}>Arrange Sections</span>
                {updateScetions?.map(
                  ({ id, title, isArchived, subSections }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided: any) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.charactersThumb}>
                              <Image
                                src={"/assets/svg/drag.svg"}
                                alt={`${title}`}
                                height={28}
                                width={28}
                              />
                            </div>
                            <div className={styles.sectionDetailWrapper}>
                              <div className={styles.toggleWrapper}>
                                <label className={styles.toggleLabel}>
                                  <input
                                    type="checkbox"
                                    onClick={() => handleToggle(index)}
                                    className={styles.toggleInput}
                                    checked={!isArchived}
                                  />
                                  <span className={styles.toggleSpan} />
                                </label>
                                <p className={styles.sectionName}>{title}</p>
                              </div>
                              <div className={styles.rightIconWrapper}>
                                {subSections?.items?.length ? (
                                  <Link
                                    href={{
                                      pathname: `/configure/arrange-section/arrange-sub-section/${encodeURI(
                                        id
                                      )}`,
                                    }}
                                  >
                                    <Image
                                      alt="option"
                                      src="/assets/svg/right.svg"
                                      height={14}
                                      width={14}
                                    />
                                  </Link>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.buttonsDiv}>
          <Link
            href={{
              pathname: `/configure/arrange-section/add-new-section`,
            }}
          >
            <Button type="primary" size={"large"} ghost>
              + Add New Section
            </Button>
          </Link>

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            size={"large"}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default transition(Customise);
