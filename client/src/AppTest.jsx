const AppTest = () => {
  const location = useLocation();
  const background = location.state?.background; //

  return (
    <>
      <Routes location={background || location}>
        <Route path="testing" element={<Testing />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/testing/p/:id" element={<TestingDialog />} />
        </Routes>
      )}
    </>
  );
};

export default AppTest;
