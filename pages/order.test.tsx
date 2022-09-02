import { render, screen } from "@testing-library/react"
import Order from "./order";
import renderer from 'react-test-renderer'
import useSWR, { Middleware, SWRConfig, SWRResponse } from "swr"

const testMiddleware: Middleware = () => {
  return (): SWRResponse<any, any> => {
    return {
      data: [{
        "name": "ポークポークカレー・ミート",
        "price": 1490,
        "imagePath": "/img_curry/2.jpg",
        "toppingList": [
          {
            "name": "ロースハム",
            "id": 4,
            "checked": true
          },
          {
            "name": "ほうれん草",
            "id": 5,
            "checked": true
          },
          {
            "name": "ナス",
            "id": 6,
            "checked": true
          }
        ],
        "count": 1,
        "TotalPrice": 2090,
        "id": 1
      }],
      error: undefined,
      mutate: (_) => Promise.resolve(),
      isValidating: false
    }
  }
}

test("SWRのmiddlewareを利用したパターン", () => {
  render(
    <SWRConfig value={{ use: [testMiddleware] }}>
      <Order />
    </SWRConfig>
  );
  screen.debug();
  const linkElement = screen.getByText(/商品名/);
  expect(linkElement).toBeInTheDocument();
}) 
