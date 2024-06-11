import { data } from './data.js';

function TITLE() {

  const title = Object.groupBy(data, ({ title }) => title);

  return (
    <div>
      <p></p>
      {Object.keys(title).map((titleKey) => (
        <div key={titleKey}>
          <ul>
            {title[titleKey].map((item, index) => (
              <li key={index}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TITLE;
