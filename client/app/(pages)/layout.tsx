"use client";
import { FC } from "react";
import { ChildrenType } from "@/utils/types";
import Header from "@/layout/Header";
import { Container, Column, Row } from "@/utils/styles/grid-system";
import { Sidebar } from "@/layout/Sidebar";
import { MainContent } from "@/utils/styles";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRouter } from "next/navigation";

const PagesLayout: FC<ChildrenType> = ({ children }) => {
  const router = useRouter();
  const { authUser: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Column size={4}>
              <Sidebar />
            </Column>
            <Column size={7}>
              <MainContent>{children}</MainContent>
            </Column>
          </Row>
        </Container>
      </>
    );
  }

  router.replace('/login');
  return null;
};

export default PagesLayout;
