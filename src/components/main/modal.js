import { useContext } from 'react'
import Modal from 'react-modal'
import { ContractContext } from '../../containers/main'

function ModalComponent() {

  const { wallet_address, closeModal, isModalOpen } = useContext(ContractContext)
  const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 'none'
    },
  }

  return (
    <div className="cx-modal">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Modal for winner"
      >
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Winner Address</h5>
              </div>
              <div className="modal-body">
                <p>{wallet_address}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent
