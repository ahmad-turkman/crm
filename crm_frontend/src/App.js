import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Sidenavigation from './components/Sidenavigation';
import ProductGrid from './components/product/ProductGrid';
import CustomerGrid from './components/customer/CustomerGrid';
import ContactGrid from './components/contact/ContactGrid';
import StepsGrid from './components/sales_steps/StepsGrid';
import OppsGrid from './components/opportunities/OppsGrid';
import { Footer, Stack } from 'rsuite';
import StackItem from 'rsuite/esm/Stack/StackItem';
import Opp from './components/opportunities/Opp';
import Funnel from './components/funnel/Funnel';
import CAPGrid from './components/cap/CAPGrid';
import CAP from './components/cap/CAP';
import 'jquery/dist/jquery';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <Stack.Item style={{ height: '100%' }}>
                  <Sidenavigation isExpanded={true} />
                </Stack.Item>
              </Stack>
            }
          />
          <Route
            path="/customers"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <CustomerGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/leads"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      {' '}
                      <CustomerGrid isLead={true} />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/contacts"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <ContactGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/products"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <ProductGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/steps"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <StepsGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/opps"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <OppsGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="opps/:oppId"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <Opp />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/funnel"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <Funnel />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/cap"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <CAPGrid />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
          <Route
            path="/cap/:capId"
            element={
              <Stack
                direction="column"
                alignItems="stretch"
                style={{ height: '100%' }}
              >
                <StackItem>
                  <Header />
                </StackItem>
                <StackItem flex={1} style={{ height: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    style={{ height: '100%' }}
                  >
                    <Stack.Item style={{ height: '100%' }}>
                      <Sidenavigation />
                    </Stack.Item>

                    <Stack.Item
                      flex={1}
                      style={{ height: '100%', marginLeft: '60px' }}
                    >
                      <CAP />
                    </Stack.Item>
                  </Stack>
                </StackItem>
                <StackItem>
                  <Footer>Footer</Footer>
                </StackItem>
              </Stack>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
