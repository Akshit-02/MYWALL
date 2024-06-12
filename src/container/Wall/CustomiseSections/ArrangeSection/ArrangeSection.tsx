"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Section, SubSection } from "@/models";
import styles from "./ArrangeSection.module.scss";
import {
  getSections,
  sortSubSection,
} from "@/store/sagas/handlers/configure.handle";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import transition from "@/components/Transition/Transition";
import Header from "@/components/Header/Header";

interface AddComponent {
  section: string;
}

const ArrangeSection = ({ section }: AddComponent) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userDetail } = useSelector((state: any) => state.auth);

  const sections: Array<Section> | undefined = useMemo(
    () => userDetail?.sections || [],
    [userDetail?.sections]
  );

  const subSections: Array<SubSection> = useMemo(() => {
    if (sections?.length) {
      const activeSection = sections.find(
        (sections) => sections?.id === section
      );
      return activeSection && activeSection.subSections
        ? (activeSection.subSections?.items as Array<SubSection>) || []
        : [];
    }
    return [];
  }, [sections, section]);

  const [subSectionsData, updateSubSectionData] = useState(subSections);

  const handleToggle = (index: number) => {
    const updatedSection = [...subSectionsData];
    updatedSection[index] = {
      ...updatedSection[index],
      enabled: !updatedSection[index].enabled,
    };

    updateSubSectionData(updatedSection);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(subSectionsData);
    const [reorderedItem] = items.splice(result?.source?.index, 1);
    items.splice(result?.destination?.index, 0, reorderedItem);

    const updatedItems = items.map((element: any) => {
      return {
        ...element,
        position: result?.destination?.index,
      };
    });

    updateSubSectionData(updatedItems);
  }

  const submitSection = async () => {
    setLoading(true);
    try {
      const sortedSubSections = subSectionsData.map((element) => ({
        id: element?.id,
        enabled: element?.enabled,
      }));

      const payload = {
        subSectionIds: sortedSubSections,
      };

      await sortSubSection(payload);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.id,
      });
      getSections(userDetail?.id);
    } catch (error) {
    } finally {
      setLoading(false);
      router.push("/configure/arrange-section");
    }
  };

  return (
    <>
      <div className={`${styles.addNewComponents} pageWidth`}>
        <Header
          title={
            sections?.find((sectionObj) => sectionObj?.id === section)?.title ||
            ""
          }
        />

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided: any) => (
              <ul
                className={styles.characters}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <span className={styles.labelText}>Arrange Sub-Sections</span>
                {subSectionsData?.map(({ id, title, enabled }, index) => {
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
                                  defaultChecked={!!enabled}
                                  onClick={() => handleToggle(index)}
                                  className={styles.toggleInput}
                                />
                                <span className={styles.toggleSpan} />
                              </label>
                              <p className={styles.sectionName}>{title}</p>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.buttonsDiv}>
          <Button
            type="primary"
            loading={loading}
            onClick={submitSection}
            size={"large"}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default transition(ArrangeSection);
