import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from "../hooks/useTransactions";

import { Container, TransationTypeContainer, RadioBox } from "./styles";


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    < Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)} />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))} />

        <TransationTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => { setType('deposit'); }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            activeColor="red"
            isActive={type === 'withdraw'}
            onClick={() => { setType('withdraw'); }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>

        </TransationTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)} />
        <button type="submit">Cadastrar</button>

      </Container>
    </Modal >
  )
}