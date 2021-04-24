import React from 'react'
import Autocomplete from 'react-autocomplete'
import styles from './deck-table-filter.module.css'
import _, { isEmpty, uniqueId } from 'lodash'
import { Dispatch } from 'redux'
import { Store } from '../../store/redux'
import { useSelector, useDispatch } from 'react-redux'
import { CardState, CardReduxEvent } from '../../store/models/card/types'
import { setFilter, clearFilter } from '../../store/models/card/actions'

type DeckTableFilterProps = {
  text: string
}

const DeckTableFilter: React.FC<DeckTableFilterProps> = props => {
  const [text, setText] = React.useState(props.text)
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const { model } = useSelector<Store, CardState>(state => state.cards)

  React.useEffect(() => {
    setText(props.text)
  }, [props.text])

  return (
    <div className={styles.filter}>
      <div>
        <Autocomplete
          getItemValue={item => item.name}
          items={Object.values(model.entities.card)}
          shouldItemRender={(item, value) =>
            _.isEmpty(value) ||
            item.name.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
          }
          renderItem={(item, isHighlighted) => (
            <div
              key={uniqueId()}
              style={{
                textAlign: 'left',
                padding: '4px 8px',
                color: '#666',
                background: isHighlighted ? 'lightgray' : 'white'
              }}
            >
              {item.name}
            </div>
          )}
          inputProps={{ className: styles.filterInput }}
          value={text}
          onChange={e => setText(e.target.value)}
          onSelect={val => setText(val)}
        />
      </div>
      <div className={styles.filterButton}>
        <button
          onClick={() =>
            isEmpty(text) ? dispatch(clearFilter()) : dispatch(setFilter(text))
          }
        >
          Filter
        </button>
      </div>
    </div>
  )
}

export default DeckTableFilter
